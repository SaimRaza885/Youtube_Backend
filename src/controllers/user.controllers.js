import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Cloudinary_File_Upload } from "../utils/Cloudinary.js";
import mongoose from "mongoose";

const GenerateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.GenerateAccessToken();
    const refreshToken = user.GenerateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Faild to generate ACCESS and REFRESH token", error.message);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Steps for user registration

  // Get user infromtaion from frontend (Postman)
  // Valitdation (any sapces or empty field)
  // Check If USER All REady Exist
  // Images Uploaded Corecttly specially (Avatar)
  // Upload them to cloudinary (Avatar)
  // Now Crate a user OBJECT - create entry in DB
  // Remove Password and Refresh Token from the Response
  // Check For User Creation
  // Reutrn Response

  const { username, email, password, fullName } = req.body;
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const Existed_User = await User.findOne({ $or: [{ username }, { email }] });
  if (Existed_User) {
    throw new ApiError(409, "The email or username already exists");
  }

  // console.log("Files:", req.files); // Debug
  const localAvatarPath = req.files?.avatar?.[0]?.path;
  let localCoverImagePath;

  if (!localAvatarPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  console.log("Uploading file:", localAvatarPath); // Debug

  const avatar = await Cloudinary_File_Upload(localAvatarPath);

  console.log("Cloudinary result:", avatar); // Debug

  if (!avatar?.url) {
    throw new ApiError(500, "Failed to upload avatar to Cloudinary");
  }

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    localCoverImagePath = req.files.coverImage[0].path;
  }

  const coverImage = await Cloudinary_File_Upload(localCoverImagePath);

  // console.log(localAvatarPath)

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully", userCreated));
});

const loginUser = asyncHandler(async (req, res) => {
  // Algorithm
  // get data form (req.body)
  // email or username
  // find user
  // password check
  // access and resfresh token
  // send cookie

  const { username, email, password} = req.body;
  console.log("Request body:", req.body);

  if (!email && !username) {
    throw new ApiError(404, "Email or Username is requreid");
  } 

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(400, "Please first get REGISTER then try for logging");
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "plese give a write password");
  }

  const { accessToken, refreshToken } = await GenerateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const opitons = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200) /* To check that diffrent status code create errir or not */
    .cookie("accessToken", accessToken, opitons)
    .cookie("refreshToken", refreshToken, opitons)
    .json(
      new ApiResponse(
        201,
        {
          user: loggedInUser,
          accessToken,
          refreshToken /*it is a case whre user wnat to save token */,
        },
        "user LoggedIn SUCESSFULLY"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const opitons = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", opitons)
    .clearCookie("refreshToken", opitons)
    .json(new ApiResponse(200, {}, "User Logout SucessFully"));
});

// An EndPoint to Generate new Access and REfresh token

const AccessRefreshToken = async (req, res) => {
  const incommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(401, "Inavaild Refresh Token Given By User");
  }

  try {
    const decodedInfo = jwt.verify(
      incommingRefreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    if (!decodedInfo) {
      throw new ApiError(404, "Please give a correct | Valid Refresh Token");
    }

    const user = User.findById(decodedInfo._id);

    if (!user) {
      throw new ApiError(404, "Can,t Find the User | Invalid Refresh Token");
    }

    if (incommingRefreshToken !== user.refreshToken) {
      throw new ApiError(404, "The Given Refresh Token Didnt match");
    }

    const { accessToken, newrefreshToken } =
      await GenerateAccessAndRefreshToken(
        user._id
      ); /* possibilty of error in newrefrshtoken */

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "successFully Refresh the Token"
        )
      );
  } catch (error) {
    throw new ApiError(404, error.message || "Faild to RefreshToken");
  }
};

// Change Current Password

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Validate input fields
  if (!oldPassword) {
    throw new ApiError(400, "Old password is missing");
  }
  if (!newPassword) {
    throw new ApiError(400, "New password is missing");
  }

  // Find user
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Verify old password
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect old password");
  }

  // Update password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false }); // Bypassing validation to skip other required fields

  // Return response without sensitive user data
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Get Curent User

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .json(new ApiResponse(201, req.user, "Get The Current User  SucessFully"));
});

// Update UserAccount Details
const UpdateAccountDetails = asyncHandler(async (req, res) => {
  const { email, fullName } = req.body;

  // Check that at least one field is provided
  if (!email || !fullName) {
    throw new ApiError(
      400,
      "At least one field is required (email or fullName)"
    );
  }

  // Find the user
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "Cannot find the user");
  }

  // Update user fields (only if provided)
  const updatedAccountDetails = await User.findOneAndUpdate(
    { _id: req.user._id }, // Corrected this
    {
      $set: {
        email,
        fullName,
      },
    },
    {
      new: true, // Return the updated document
    }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAccountDetails,
        "Account details updated successfully"
      )
    );
});

// Productoin Guide that always write a seprate controller for updateing files

// Updating file (avatar)

const UpdateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, " avatarLocalPath File Path Missing");
  }

  const avatar = await Cloudinary_File_Upload(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Faild to upload on Couldinary ");
  }

  const UpdatedAvatarUser = await User.findOneAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, UpdatedAvatarUser, "Successfully Updated The AVATAR")
    );
});
// Updating file (CoverImage)
const UpdateCoverImage = asyncHandler(async (req, res) => {
  const CoverImageLocalPath = req.file?.path;

  if (!CoverImageLocalPath) {
    throw new ApiError(400, " CoverImageLocalPath File Path Missing");
  }

  const CoverImage = await Cloudinary_File_Upload(CoverImageLocalPath);

  if (!CoverImage.url) {
    throw new ApiError(400, "Faild to upload on Couldinary ");
  }

  const UpdatedCoverImageUser = await User.findOneAndUpdate(
    req.user._id,
    {
      $set: {
        // Updating file (avatar)
        coverImage: CoverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        UpdatedCoverImageUser,
        "Successfully Updated The Cover Image"
      )
    );
});

// Get Your channel profile

const GetUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new ApiError(400, "Username not Found");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribers",
        },
        channelSubscribeToCount: {
          $size: "$subscribedTo",
        },
        isSubscribe: {
          $cond: {
            if:{$in:[req.user?._id ,"$subscribers.subscriber"]}, 
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        username: 1,
        coverImage: 1,
        fullName: 1,
        email: 1,
        avatar: 1,
        subscriberCount: 1,
        channelSubscribeToCount: 1,
        isSubscribe: 1,
      },
    },
  ]);

  if (!channel?.length) {
    /* Check and make it > 0 */
    throw new ApiError(400, "Chanel does not exist");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User Channel Created SuccessFully")
    );
});

// Get yours WatchHistory
const GetUserHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "WatchHistory",
        foreignField: "_id",
        as: "WatchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  /* remove this out and then */
                  $project: {
                    username: 1,
                    coverImage: 1,
                    fullName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].WatchHistory,
        "User WatchHistory Fetched SuccessFully "
      )
    );
});
export {
  registerUser,
  loginUser,
  logoutUser,
  AccessRefreshToken,
  changeCurrentPassword,
  getCurrentUser,
  UpdateAccountDetails,
  UpdateAvatar,
  UpdateCoverImage,
  GetUserChannelProfile,
  GetUserHistory,
};

import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  Cloudinary_File_Upload,
  deleteOnCloudinary,
} from "../utils/Cloudinary.js";
import { Like } from "../models/like.model.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  // TODOS:
  // first i have to check that is query avalible
  // then check for the user
  // than  i will manage the sorting
  // then left join the user details like name and avatar
  // at last i will use aggerate paginate to load it smootly

  const pipeline = [];

  if (query) {
    pipeline.push({
      $search: {
        index: "search-vidoes",
        text: {
          query: query,
          path: ["title", "description"],
        },
      },
    });
  }
  if (userId) {
    if (!isValidObjectId(userId)) {
      throw new ApiError(404, "Invalid User Id");
    }
    pipeline.push({
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    });
  }

  // all the vidoes that are set as ispublished true
  pipeline.push({ $match: { isPublished: true } });

  // Sorting
  //sortType can be ascending(-1) or descending(1)
  //sortBy can be views, createdAt, duration
  if (sortBy && sortType) {
    pipeline.push({
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    });
  } else {
    pipeline.push({ $sort: { createdAt: -1 } });
  }

  pipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              username: 1,
              "avatar.url": 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$ownerDetails",
    }
  );

  const videoAggregate = Video.aggregate(pipeline);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const video = await Video.aggregatePaginate(videoAggregate, options);

  return res
    .status(201)
    .json(new ApiResponse(200, video, "Vidoes Feched SuccessFully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // TODO: get video, upload to cloudinary, create video
  if (!title || !description) {
    throw new ApiError(400, "Title or description missing");
  }

  const videoLocalPath = req.files?.videoFile?.[0]?.path;

  if (!videoLocalPath) {
    throw new ApiError(400, "Can Not find Video path");
  }

  const video = await Cloudinary_File_Upload(videoLocalPath);

  if (!video?.url) {
    throw new ApiError(400, "Failed To Upload the video on Cloudinary");
  }

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Can Not find Thubnail path");
  }

  const thumbnail = await Cloudinary_File_Upload(thumbnailLocalPath);

  if (!thumbnail?.url) {
    throw new ApiError(400, "Failed To Upload the thumbnail on Cloudinary");
  }

  const videoInDataBase = await Video.create({
    videoFile: {
      url: video.url,
      public_id: video.public_id,
    },
    thumbnail: {
      url: thumbnail.url,
      public_id: thumbnail.public_id,
    },
    title,
    description,
    duration: video?.duration,
    owner: req.user?._id,
    isPublished: false,
  });

  if (!videoInDataBase) {
    throw new ApiError(500, "we Faild to UPLOAD the Vidoe");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, videoInDataBase, "Video Published SuccessFully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  if (!isValidObjectId(req.user?._id)) {
    throw new ApiError(400, "Invalid userId");
  }

  const fetched_Video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "All_Likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "video",
        as: "All_Comments",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "onwer",
              foreignField: "_id",
              as: "comment_owner",
            },
          },
          {
            $unwind: {
              path: "$comment_owner",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              content: 1,
              createdAt: 1,
              "comment_owner.username": 1,
              "comment_owner.avatar": 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "Video_Owner_Details",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers",
            },
          },
          {
            $addFields: {
              Subscribers_Count: { $size: "$subscribers" },
              isSubscribed: {
                $cond: {
                  if: {
                    $in: [
                      new mongoose.Types.ObjectId(req.user?._id),
                      "$subscribers.subscriber",
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $project: {
              Subscribers_Count: 1,
              isSubscribed: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        like_Count: { $size: "$All_Likes" },
        isLiked: {
          $cond: {
            if: {
              $in: [
                new mongoose.Types.ObjectId(req.user?._id),
                {
                  $map: {
                    input: "$All_Likes",
                    as: "like",
                    in: "$$like.likedBy",
                  },
                },
              ],
            },
            then: true,
            else: false,
          },
        },
        comment_count: { $size: "$All_Comments" },
        owner: { $first: "$Video_Owner_Details" },
      },
    },
    {
      $project: {
        "videoFile.url": 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        owner: 1,
        comment_count: 1,
        like_Count: 1,
        isLiked: 1,
        All_Comments: 1,
      },
    },
  ]);

  if (!fetched_Video.length) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, fetched_Video[0], "Successfully fetched video"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "Please provide a video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const { title, description } = req.body;

  if (!title && !description) {
    throw new ApiError(400, "At least one of title or description is required");
  }

  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Can Not find Thubnail path");
  }

  const thumbnail = await Cloudinary_File_Upload(thumbnailLocalPath);

  if (!thumbnail?.url) {
    throw new ApiError(400, "Failed To Upload the thumbnail on Cloudinary");
  }

  const updatedVideo = await Video.findOneAndUpdate(
    { _id: video._id },
    {
      $set: {
        title: title || video.title,
        description: description || video.description,
        thumbnail: {
          url: thumbnail.url,
          public_id: thumbnail.public_id,
        },
      },
    },
    { new: true } // return the updated video
  ).select("-duration -views -isPublished");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "No video found");
  }

  await deleteOnCloudinary(video.thumbnail.public_id); // video model has thumbnail public_id stored in it->check videoModel
  await deleteOnCloudinary(video.videoFile.public_id, "video"); // specify video while deleting video

  const deletedVideo = await Video.findByIdAndDelete(video?._id);

  if (!deletedVideo) {
    throw new ApiError(500, "Failed to delete the video");
  }
  // delete video likes
  await Like.deleteMany({
    video: videoId,
  });

  // delete video comments
  await Comment.deleteMany({
    video: videoId,
  });
  return res
    .status(200)
    .json(new ApiResponse(200,{},"Video Deleted Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { isPublished } = req.body;

  if (!videoId) {
    throw new ApiError(400, "Please provide a video ID");
  }

  const video = await Video.findOneAndUpdate(
    { _id: videoId },
    { $set: { isPublished } },
    { new: true }
  );

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Video publish status toggled successfully", video)
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};

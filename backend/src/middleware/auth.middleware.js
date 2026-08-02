import jwt from "jsonwebtoken";
import { ApiError } from "../utils/Api_Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

 const VerifyJWT = asyncHandler(async (req, _, next) => {
 try {
     const token =
       req.cookies?.accessToken ||
       req.header("Authorization")?.replace("Bearer ", "");
   
     if (!token) {
       throw new ApiError(401, "Authentication required");
     }
   
     const decodedTokenInfo = jwt.verify(
       token,
       process.env.JWT_ACCESS_TOKEN_SECRET
     );
   
     const user = await User.findById(decodedTokenInfo._id).select(
       "-password -refreshToken"
     );
   
     if (!user) {
      throw new ApiError(401, "Invalid or expired access token");
      }
    
      req.user = user;
      next();
  } catch (error) {
     throw new ApiError(401, "Invalid or expired access token", error?.message)
 }
});

export default VerifyJWT

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
       throw new ApiError(400, "UnAuthorized Request ??");
     }
   
     const decodedTokenInfo = jwt.verify(
       token,
       process.env.JWT_ACCESS_TOKEN_SECRET
     );
   
     const user = await User.findById(decodedTokenInfo._id).select(
       "-password -refreshToken"
     );
   
     if (!user) {
       throw new ApiError(401, "Invalid Access Token");
     }
   
     req.user = user;
     next();
 } catch (error) {
    throw new ApiError(401,"Invalid Access Token",error?.message)
 }
});

export default VerifyJWT

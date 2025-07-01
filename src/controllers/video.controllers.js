import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import {uploadOnCloudinary} from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // TODO: get video, upload to cloudinary, create video
  if (!title || !description) {
    throw new ApiError(400, "Title or description missing");
  }

  const videoLocalPath = req.files?.video[0]?.path;

  if (!videoLocalPath) {
    throw new ApiError(400, "Can Not find Video path");
  }

  const video = await Cloudinary_File_Upload(videoLocalPath);

  if (!video?.url) {
    throw new ApiError(400, "Failed To Upload the video on Cloudinary");
  }

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Can Not find Thubnail path");
  }

  const thumbnail = await Cloudinary_File_Upload(thumbnailLocalPath);

  if (!thumbnail?.url) {
    throw new ApiError(400, "Failed To Upload the thumbnail on Cloudinary");
  }

  const videoInDataBase = await Video.create({
    videoFile: {
      url: videoFile.url,
      public_id: videoFile.public_id,
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
  //TODO: get video by id
  if (!videoId) {
    throw new ApiError(400, "Please Give a Video Id");
  }
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "Video Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "SuccessFully get the id"));
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

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const updatedVideo = await Video.findOneAndUpdate(
    { _id: video._id },
    {
      $set: {
        title: title || video.title,
        description: description || video.description,
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

  return res
    .status(200)
    .json(new ApiResponse(200, "Video Deleted Successfully"));
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

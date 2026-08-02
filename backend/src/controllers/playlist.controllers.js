import mongoose, { isValidObjectId } from "mongoose";
import { PlayList } from "../models/playlist.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  //TODO: create playlist
  const { name, description = "" } = req.body;

  if (!name) {
    throw new ApiError(400, "Playlist name is required");
  }

  const playlist = await PlayList.create({
    name,
    description,
    owner: req.user?._id,
  });

  if (!playlist) {
    throw new ApiError(500, "Failed to create playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user_Play_Lists = await PlayList.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "Videos",
      },
    },
    {
      $addFields: {
        totalVideos: {
          $size: "$Videos",
        },
        totalViews: {
          $sum: "$Videos.views",
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        totalVideos: 1,
        totalViews: 1,
        updatedAt: 1,
        createdAt: 1,
        thumbnail: { $arrayElemAt: ["$Videos.thumbnail", 0] },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user_Play_Lists,
        "User playlists fetched successfully"
      )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  const acutalPlaylist = await PlayList.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "Videos",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "Owner",
      },
    },
    {
      $addFields: {
        totalVideos: {
          $size: "$Videos",
        },
        totalViews: {
          $sum: "$Videos.views",
        },
        owner: {
          $first: "$Owner",
        },
      },
    },
    {
      $project: {
        totalVideos: 1,
        totalViews: 1,
        name: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
        Videos: {
          _id: 1,
          videoFile: 1,
          thumbnail: 1,
          title: 1,
          description: 1,
          duration: 1,
          createdAt: 1,
          views: 1,
        },
        "owner.username": 1,
        "owner.fullName": 1,
        "owner.avatar": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, acutalPlaylist[0], "Playlist fetched successfully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "A valid playlist ID is required");
  }

  const playlist = await PlayList.findById(playlistId);
  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  if (
    playlist.owner?.toString() !== req.user?._id.toString()
  ) {
    throw new ApiError(403, "Only the playlist owner can add videos");
  }

  const updatedPlaylist = await PlayList.findByIdAndUpdate(
    playlist._id,
    {
      $addToSet: {
        video: videoId,
      },
    },
    { new: true }
  );

  if (!updatedPlaylist) {
    throw new ApiError(500, "Failed to add video to playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "A valid playlist ID is required");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (
    playlist.owner?.toString() !== req.user?._id.toString()
  ) {
    throw new ApiError(403, "Only the playlist owner can remove videos");
  }

  const deleting_playlist_video = await PlayList.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        video: videoId,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, deleting_playlist_video, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Please provide a valid playlist ID");
  }

  const playlist = await PlayList.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  if (playlist.owner?.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "Only the playlist owner can delete this playlist");
  }

  const deleting_playlist = await PlayList.findOneAndDelete({ _id: playlist._id }); // ✅ await + correct usage

  if (!deleting_playlist) {
    throw new ApiError(500, "Failed to delete playlist");
  }

  return res.status(200).json(
    new ApiResponse(200, playlistId, "Playlist deleted successfully")
  );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Please provide a valid playlist ID");
  }

  const playlist = await PlayList.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  if (playlist.owner?.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "Only the playlist owner can update this playlist");
  }

  // Build the update object dynamically
  const updateFields = {};
  if (name) updateFields.name = name;
  if (description) updateFields.description = description;

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const updatedPlaylist = await PlayList.findByIdAndUpdate(
    playlist._id,
    { $set: updateFields },
    { new: true }
  );

  if (!updatedPlaylist) {
    throw new ApiError(500, "Failed to update playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Playlist updated successfully"));
});


export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};

import mongoose, { isValidObjectId } from "mongoose";
import { PlayList } from "../models/playlist.model.js";
import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  //TODO: create playlist
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "PlayList Name is requried");
  }

  if (!description) {
    throw new ApiError(400, "PlayList Descrition is requried");
  }

  const playlist = await PlayList.create({
    name,
    description,
    owner: req.user?._id,
  });

  if (!playlist) {
    throw new ApiError(500, "Failed to create Playlist");
  }

  return res
    .status(200)
    .jsos(new ApiResponse(200, playlist, "Playlist created Successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User ID");
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
        updateupdatedAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user_Play_Lists,
        "User Playlsit Fetched SuccessFully"
      )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist id ");
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
        from: "vidoes",
        localField: "video",
        foreignField: "_id",
        as: "Videos",
      },
    },
    {
      $match: {
        "$Videos.isPublished": true,
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
          $sum: "$videos.views",
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
        Owner: {
          username: 1,
          fullName: 1,
          avatar: 1,
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, acutalPlaylist[0], "PlayList Fetched SuccessFully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Please Provide a valid id");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  const video = await PlayList.findById(videoId);

  if (!video) {
    throw new ApiError(400, "video not found");
  }
  if (
    (playlist.owner?.toString() && video.owner.toString()) !==
    req.user?._id.toString()
  ) {
    throw new ApiError(400, "only owner can add video to thier playlist");
  }

  const add_Video_To_Playlist = PlayList.findByIdAndUpdate(
    playlist?._id,
    {
      $addToSet: {
        videos: videoId,
      },
    },
    { new: true }
  );

  if (!addVideoToPlaylist) {
    throw new ApiError(500, "Faild to add video to playlist");
  }

  return res
    .status(200)
    .json(200, add_Video_To_Playlist, "Video Added to Playlist SuccessFully");
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Please Provide a valid id");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  const video = await PlayList.findById(videoId);

  if (!video) {
    throw new ApiError(400, "video not found");
  }
  if (
    (playlist.owner?.toString() && video.owner.toString()) !==
    req.user?._id.toString()
  ) {
    throw new ApiError(
      400,
      "only owner can Delete a  video from their playlist"
    );
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
    .json(
      new ApiResponse(
        201,
        deleting_playlist_video,
        "video removed from playlist successFully"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Please Provide a  valid playlist id");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  if (playlist.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(400, "only owner can delete the playlist");
  }

  const deleting_playlist = PlayList.findOneAndDelete(playlist._id);

  if (!deleting_playlist) {
    throw new ApiError(500, "fail to delete the playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlistId, "Playlist Deleted SuccessFully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Please Provide a  valid playlist id");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }

  if (!name || !description) {
    throw new ApiError(400, "PlayList Name or description is requried");
  }
  if (
    (playlist.owner?.toString() && video.owner.toString()) !==
    req.user?._id.toString()
  ) {
    throw new ApiError(400, "only owner can  edit  playlist");
  }

  const updatedPlaylist = PlayList.findOneAndUpdate(
    { _id: playlist._id },
    {
      $set: {
        name: name || playlist.name,
        description: description || playlist.description,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedPlaylist) {
    throw new ApiError(500, "Faild to update the given playlist ");
  }
  return res
    .status(200)
    .json(200, updatedPlaylist, "Playlist Updated SuccessFully");
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

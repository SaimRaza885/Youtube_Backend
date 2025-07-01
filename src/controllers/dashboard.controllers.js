import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const userId = req.user?._id;

  const all_Subscribers = await Subscription.aggregate([
    {
      $match: {
        chnnel: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        subscriber_Count: {
          sum: 1,
        },
      },
    },
  ]);

  const all_vidoes_info = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "video",
        localField: "_id",
        as: "VideoLikes",
      },
    },
    {
      $project: {
        totalLikes: {
          $size: "$VideoLikes",
        },
        totalViews: "$views",
        totalVideos: 1,
      },
    },
    {
      $group: {
        _id: null,
        total_likes: {
          $sum: "$totalLikes",
        },
        total_views: {
          $sum: "$totalViews",
        },
        totalVideos: {
          sum: 1,
        },
      },
    },
  ]);

  const Channel_Status = {
    totalSubscribers: all_Subscribers[0].subscriber_Count || 0,
    totalVideos: all_vidoes_info[0].totalVideos || 0,
    totalViews: all_vidoes_info[0].total_views || 0,
    totalLikes: all_vidoes_info[0].total_likes || 0,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, Channel_Status, "Fetched channel stats successFully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const all_uploaded_vidoes = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "video",
        localField: "_id",
        as: "likes",
      },
    },
    {
      $addFields: {
        createdAt: {
          $dateToParts: { date: "$createdAt" },
        },
        likesCount: {
          $size: "$likes",
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
        "videoFile.url": 1,
        "thumbnail.url": 1,
        description: 1,
        title: 1,
        createdAt: {
          year: 1,
          month: 1,
          day: 1,
        },
        isPublished,
        likesCount: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        all_uploaded_vidoes,
        "fetched all the vidoes uploaded by owner"
      )
    );
});

export { getChannelStats, getChannelVideos };

import { ApiResponse } from "../utils/Api_Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (_, res) => {
  //TODO: build a healthcheck response that simply returns the OK status as json with a message

  return res
    .status(200)
    .json(new ApiResponse(200, "Everything is working fine"));
});

export { healthcheck };

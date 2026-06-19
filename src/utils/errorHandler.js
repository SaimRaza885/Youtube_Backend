import { ApiError } from "./Api_Error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      data: null,
      message: err.message,
      success: false,
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({
      statusCode: 400,
      data: null,
      message: `File upload error: ${err.message}`,
      success: false,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    data: null,
    message: "Internal Server Error",
    success: false,
  });
};

export default errorHandler;

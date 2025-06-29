// const asyncHandler = (fun) => async (req,res,next ) =>{

//     try{
//         await fun(req,res,next)
//     }
//     catch(error){
//         res.status(error.code || 404 ).json({
//             success:false,
//             message:error.message
//         })
//     }
//

// ==============================================  METHOD (2) =======================================================

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };
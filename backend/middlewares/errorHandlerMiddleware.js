// this is custom error handling middleware
const errorHandlerMiddleware = async (err, req, res, next) => { 
    const statusCode = res.statusCode ? res.statusCode : 500; // checking if the status code exist
    res.status(statusCode)
    res.json({
        success: false,
        message: err.message,
        //set only show error stack on development mode
        stack:process.env.NODE_ENV === "development" ? err.stack:null
    })
};

module.exports = {errorHandlerMiddleware};
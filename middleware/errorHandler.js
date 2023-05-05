const errorHandler = (error, req, res, next) => {

    const value = error.message
    console.log(value);



}

module.exports = errorHandler;
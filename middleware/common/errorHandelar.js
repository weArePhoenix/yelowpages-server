const createError = require('http-errors');

// 404 not found error
const notFoundError = (req, res, next) => {
    next(createError(404, 'The request content is not found'));
};

// Default error handelar
const errorHandelar = (err, req, res, next) => {
    const error = process.env.ENV === 'development' ? err : { message: err.message };

    res.status(err.status || 500);
    // res.send(error)
    next(error)
};

module.exports = { notFoundError, errorHandelar };
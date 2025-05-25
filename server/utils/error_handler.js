const AppError = require('./app_error')

function handleCastErrorDB(err) {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

function handleDuplicateFieldsDB(err) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value!`
    return new AppError(message, 400)
}

function handleValidationErrorDB(err) {
    const errors = Object.values(err.errors).map((el) => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

function sendError(err, res) {
    if (err.isOperational) {
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message,
        })
    } else {
        res.status(500).send({
            status: 'error',
            message: err.message ?? 'Something went very wrong!',
        })
    }
}

module.exports = (err, req, res, next) => {
    console.log('Error 💥', err.name)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if (err.code === 11000) err = handleDuplicateFieldsDB(err)
    if (err.name === 'CastError') err = handleCastErrorDB(err)
    if (err.name == 'ValidationError') err = handleValidationErrorDB(err)

    sendError(err, res)
}

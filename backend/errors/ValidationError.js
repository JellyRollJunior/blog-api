class ValidationError extends Error {
    constructor(message, validationErrors, statusCode = 400) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }
}

export { ValidationError };

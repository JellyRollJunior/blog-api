import { check } from "express-validator";

const EMPTY_ERROR = 'must not be empty.';
const LENGTH_ERROR = 'must be between 1 and 120 characters';
const commentValidation = [
    check('content').trim()
        .notEmpty().withMessage(`Content ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 120 }).withMessage(`Content ${LENGTH_ERROR}`),
]

export { commentValidation }
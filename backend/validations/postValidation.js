import { check } from "express-validator";

const EMPTY_ERROR = 'must not be empty.';
const TITLE_LENGTH_ERROR = 'must be between 6 and 64 characters.'
const CONTENT_LENGTH_ERROR = 'must be between 6 and 8000 characters.'
const DATE_FORMAT_ERROR = 'must adhere to ISO8601 date format.'
const postValidation = [
    check('title').trim()
        .notEmpty().withMessage(`Title ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 64}).withMessage(`Title ${TITLE_LENGTH_ERROR}`),
    check('content').trim()
        .notEmpty().withMessage(`Content ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 8000 }).withMessage(`Content ${CONTENT_LENGTH_ERROR}`),
    check('publishTime').trim()
        .notEmpty().withMessage(`PublishTime ${EMPTY_ERROR}`)
        .isISO8601().withMessage(`PublishTime ${DATE_FORMAT_ERROR}`),
];

export { postValidation}
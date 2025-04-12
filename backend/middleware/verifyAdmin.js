const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        return next();
    }
    const error = new Error('User is not authorized to perform this action');
    error.code = 401;
    next(error);
};

export { verifyAdmin };

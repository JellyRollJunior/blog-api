import passport from 'passport';

const authenticateJwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (info && info.name == 'JsonWebTokenError') {
            const jwtError = new Error('Unauthorized: invalid jwt');
            jwtError.statusCode = 401;
            return next(jwtError);
        }
        if (err || !user) {
            console.log(err);
            console.log(user);
            return next(info);
        }
        req.user = user;
        return next();
    })(req, res, next);
};

export { authenticateJwt };

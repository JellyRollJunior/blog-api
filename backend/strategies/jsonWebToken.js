import dotenv from 'dotenv';
import passportJwt from 'passport-jwt';
import * as db from '../model/db.js';
dotenv.config();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET,
}

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await db.getUserById(jwt_payload.id);
    const {password, ...authData} = user;
    done(null, authData);
})

export { jwtStrategy }
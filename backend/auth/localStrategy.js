import passportLocal from 'passport-local';
import * as db from '../model/db.js';

const LocalStrategy = new passportLocal.Strategy;

const localStrategy = new LocalStrategy(async (username, password, done) => {

})
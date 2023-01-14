"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = require("../models/postgres/user-model");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CALLBACK_URL = `${process.env.API_URL}api/auth/google/callback`;
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    state: true,
}, (req, accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('profile' + profile.provider + ' ' + profile.email + ' ' + profile.id);
    const googleUser = {
        id: profile.id,
        email: profile.email,
        username: profile.displayName,
    };
    let user = yield user_model_1.User.findByEmail(googleUser.email);
    console.log(user);
    if (user && user.authStrategy !== 'google') {
        return cb(null, null);
    }
    if (!user) {
        console.log('Creating User');
        user = yield user_model_1.User.insertNewUserOAuth(googleUser.email, googleUser.username, 'google', googleUser.id);
    }
    return cb(null, user);
})));
passport_1.default.serializeUser(function (user, cb) {
    console.log('serializing user');
    console.log(user);
    cb(null, user);
});
passport_1.default.deserializeUser(function (user, cb) {
    console.log('deserialising user');
    return cb(null, user);
    console.log(user);
});

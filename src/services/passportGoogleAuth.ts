import { Request } from 'express';
import passport from 'passport';
import {
  StrategyOptions,
  VerifyCallback,
  VerifyFunctionWithRequestAndParams,
} from 'passport-google-oauth2';
import { BadRequestError } from '../common';
import { User } from '../models/postgres/user-model';
import initPgUser from './new-user-postgres';
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CALLBACK_URL = `${process.env.API_URL}api/auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      state: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: VerifyCallback
    ) => {
      console.log(
        'profile' + profile.provider + ' ' + profile.email + ' ' + profile.id
      );
      const googleUser = {
        id: profile.id,
        email: profile.email,
        username: profile.displayName,
      };
      let user = await User.findByEmail(googleUser.email);
      console.log(user);
      if (user && user.authStrategy !== 'google') {
        return cb(null, null);
      }

      if (!user) {
        console.log('Creating User');
        user = await User.insertNewUserOAuth(
          googleUser.email,
          googleUser.username,
          'google',
          googleUser.id
        );
      }
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user: any, cb) {
  console.log('serializing user');
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  console.log('deserialising user');
  return cb(null, user!);
  console.log(user);
});

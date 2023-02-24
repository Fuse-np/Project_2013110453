const passport = require("passport");
const config = require ("../config/index")
const User = require("../models/user")
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "012C9DA71C49180AA9A135F60C16227414978BD6C0975E7BADDC2256DDEAFC5C";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
   try{
    const user = await User.findById(jwt_payload.id)
    if (!user){
        return done(new Error("Not found user"),null)
    }

    return done(null,user)

   }catch (error){
    done(error)
   }
})
);

module.exports.islogin = passport.authenticate("jwt",{ session:false})
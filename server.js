const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./authen');
const app = express();
const port = 8000;

app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}

app.get('/', (req,res)=>{
    res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}) );
app.get('/google/callback' , passport.authenticate('google', {
    successRedirect: '/done',
    failureRedirect: '/failure',
}));

app.get('/done', isLoggedIn, (req,res)=>{
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/failure', (req,res)=>{
    res.send('Something went wrong...');
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    // res.redirect('/');
    res.send('Your are successfully Logout');
  });

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
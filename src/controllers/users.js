const User = require('../models/User');
const passport = require('passport');

module.exports = {

    showSignin: function(req,res) {
        res.render('users/signin');
    },
    signin: passport.authenticate('local',{
        successRedirect: '/notes',
        failureRedirect: '/users/signin',
        failureFlash: true
    }),
    showSignup: function(req,res) {
        res.render('users/signup');
    },
    signup:async function(req,res){
        const { name, email, password, confirm_password} = req.body;
        const errors = [];
    
        if(name.length <= 0) {
            errors.push({text: 'Please insert your name'});
        }
        if(password != confirm_password) {
            errors.push({text: 'Password do not march'});
        }
        if(password.length < 4) {
            errors.push({text: 'Password must be at least 4 characters'});
        }
        if(errors.length > 0) {
            res.render('users/signup',{errors,name,email,password,confirm_password});
        } else {
            const emailUser = await User.findOne({email: email});
            if(emailUser) {
                req.flash('error_message','The email is already exist');
                res.redirect('/users/signup');
            }
            const newUser = new User({name,email,password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','You are registered!');
            res.redirect('/users/signin');
        }
    },
    logout: function(req,res) {
        req.logout();
        res.redirect('/');
    }
  };
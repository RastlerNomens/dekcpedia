const helpers = {};

helpers.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_message', 'Not Authorized');
    res.redirect('/users/signin');
};

helpers.isAdmin = (req,res,next) => {
    const {user} = req;
    if(req.isAuthenticated() && user.role == 'admin') {
        return next();
    }
    req.flash('error_message','Not Authorized');
    res.redirect('/');
}   

module.exports = helpers;
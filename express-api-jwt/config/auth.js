 module.exports = {
    ensureAuthenticated: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', "please login first to view dashboard");
        res.redirect('/users/login');
    }
}
function guest (req, res, next){
    if(!req.isAuthenticated()){
        return next()
    }
    return res.reirect('/')
}

module.exports = guest
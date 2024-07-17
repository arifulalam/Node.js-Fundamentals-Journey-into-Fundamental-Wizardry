let security = (req, res, next) => {
    if(req.headers.authorization == "HelloBello"){
        next();
    }else{
        res.status(400).json({
            status: {
                code: 400,
                message: "Bad Request"
            },
            message: "You are not authorized."
        })
    }
}

module.exports = security;
let security = (req, res, next) => {
    const { username } = req.params;

    if(req.headers.authorization == username){
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
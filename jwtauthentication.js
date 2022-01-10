const jwt = require('jsonwebtoken')

module.exports = function authToken(req, res, next) {

    const isToken = req.header('auth_token')
    if(!isToken) return res.json({msg:"Access Denied"})

    try {
        const verified = jwt.verify(isToken, process.env.TOKEN_KEY)
        req.userSchema = verified
        next()
    } catch (error) {
        res.json({msg:"Invalid Token"})
    }

}


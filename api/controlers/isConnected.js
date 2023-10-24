const jwt = require('jsonwebtoken')

const isConnected = (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Pas de token")
    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if(err) return res.status(403).json('Token non valid')
        next()
    })
}

module.exports = isConnected

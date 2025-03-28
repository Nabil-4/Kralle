const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:8080'
}))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

app.listen(8080, () => {
    console.log('http://localhost:8080')
})

const registerRoute = require('./routes/auth/register')
const loginRoute = require('./routes/auth/login')
const logoutRoute = require('./routes/auth/logout')
const postRoute = require('./routes/post/post')
const commentRoute = require('./routes/post/comment')
const tendanceRoute = require('./routes/post/tendance')
const favorisRoute = require('./routes/post/favoris')
const likesRoute = require('./routes/post/likes')
const modifyUserRoute = require('./routes/user/modifyUser')
const otherProfilRoute = require('./routes/user/otherProfil')
const followRoute = require('./routes/user/follow')
const messageRoute = require('./routes/message/message')


app.use('/api/register', registerRoute)
app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/modifyUser', modifyUserRoute)
app.use('/api/otherProfil', otherProfilRoute)
app.use('/api/tendance', tendanceRoute)
app.use('/api/favoris', favorisRoute)
app.use('/api/likes', likesRoute)
app.use('/api/follow', followRoute)
app.use('/api/message', messageRoute)
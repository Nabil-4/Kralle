const db = require('../../config/connectDB.js')

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('', (req, res) => {
    const {username, email, password} = req.body
    const u = "SELECT * FROM users WHERE username = ? OR email = ?"
    db.query(u, [username, email], (err, result) => {
        if(err) return res.status(500).json(err)
        if(result.length) {
            res.status(409).json("Username or email already use")
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const q = "INSERT INTO users(username, email, password, userCreateAt, userUpdateAt) VALUES(?, ?, ?, NOW(), NOW())"
            db.query(q, [username, email, hashedPassword], (err, result) => {
                if(err) return res.status(500).json(err)

                if(result) {
                    const q = "SELECT * FROM users WHERE username = ?"
                    db.query(q, [username], (err, result) => {
                        const token = jwt.sign({id: result[0].id}, "secretkey")
                        const {password, userCreateAt, userUpdateAt, ...user} = result[0]

                        res.cookie("accessToken", token, {
                            httpOnly: true
                        }).status(200).json(user)
                    })
                } 
            }) 
        }
    }) 
})

module.exports = router
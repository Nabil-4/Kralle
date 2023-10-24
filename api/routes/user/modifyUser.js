const multer = require('multer')
const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads/users')
    },
    filename : (req, file, cb) => {
        cb(null, `${file.originalname}.${file.mimetype.split('/').pop()}`)
    }
})

const uploads = multer({storage : storage})

router.post('', isConnected, uploads.fields([{name: 'bannerPicture'}, {name: 'profilPicture'}]), (req, res) => {
    const {bannerPicture, profilPicture} = req.files
    const {username, bio, id} = req.body

    const t = "SELECT * FROM users WHERE users.username = ? AND users.id != ?"
    db.query(t, [username, id], (err, result) => {
        if(result[0]) {
            res.status(404).json('Ce pseudo est déjà utilisé')
        } else {
            if(!bannerPicture && !profilPicture) {
                const q = "UPDATE users SET username = ?, descriptif = ?, userUpdateAt = NOW() WHERE id = ?"
                db.query(q, [username, bio, id], (err, result) => {
                    const p ="SELECT * FROM users WHERE id = ?"
                    db.query(p, [id], (err, result) => {
                        const {password, userCreateAt, userUpdateAt, ...user} = result[0]
                        res.status(200).json(user)
                    })  
                })
            } else if(bannerPicture && !profilPicture) {
                const q = "UPDATE users SET username = ?, bannerPicture = ?, descriptif = ?, userUpdateAt = NOW() WHERE id = ?"
                db.query(q, [username, bannerPicture[0].filename, bio, id], (err, result) => {
                    const p ="SELECT * FROM users WHERE id = ?"
                    db.query(p, [id], (err, result) => {
                        const {password, userCreateAt, userUpdateAt, ...user} = result[0]
                        res.status(200).json(user)
                    })  
                })
            } else if(profilPicture && !bannerPicture) {
                const q = "UPDATE users SET username = ?, profilPicture = ?, descriptif = ?, userUpdateAt = NOW() WHERE id = ?"
                db.query(q, [username, profilPicture[0].filename, bio, id], (err, result) => {
                    const p ="SELECT * FROM users WHERE id = ?"
                    db.query(p, [id], (err, result) => {
                        const {password, userCreateAt, userUpdateAt, ...user} = result[0]
                        res.status(200).json(user)
                    })  
                })
            } else {
                const q = "UPDATE users SET username = ?, profilPicture = ?, bannerPicture = ?, descriptif = ?, userUpdateAt = NOW() WHERE id = ?"
                db.query(q, [username, profilPicture[0].filename, bannerPicture[0].filename, bio, id], (err, result) => {
                    const p ="SELECT * FROM users WHERE id = ?"
                    db.query(p, [id], (err, result) => {
                        const {password, userCreateAt, userUpdateAt, ...user} = result[0]
                        res.status(200).json(user)
                    })  
                })
            } 
        }
    })
 
})


module.exports = router
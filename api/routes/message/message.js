const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

router.post('', isConnected, (req, res) => {
    const {message, msgFrom, msgTo, relation} = req.body
    const q = "INSERT INTO messages(relation ,msgFrom, msgTo, contain, sendAt) VALUES(?, ?, ?, ?, NOW())"
    db.query(q, [relation, msgFrom, msgTo, message], (err, result) => {
        res.status(200).json('Message Envoyé') 
    })
})

router.get('/:msgFrom/:msgTo', isConnected, (req, res) => {
    const msgFrom = req.params.msgFrom
    const msgTo = req.params.msgTo
    const q = "SELECT users.profilPicture, users.username, messages.id, msgFrom, msgTo, contain, sendAt FROM messages JOIN users On users.id = msgFrom WHERE (msgFrom = ? AND msgTo = ?) OR (msgTo = ? AND msgFROM = ?) ORDER BY sendAt DESC"
    db.query(q, [msgFrom, msgTo, msgFrom, msgTo], (err, result) => {
        res.status(200).json(result)
    })
})

router.get('/:id', isConnected, (req, res) => {
    const userId = req.params.id
    const q = "SELECT users.profilPicture, users.username, msgFrom, msgTo, sendAt FROM messages JOIN users On users.id = IF(msgFrom <> ?, msgFrom, msgTo) WHERE  msgTo = ? OR msgFROM = ? GROUP by relation ORDER BY sendAt DESC"
    db.query(q, [userId, userId, userId], (err, result) => {
        res.status(200).json(result)
    })
})






module.exports = router
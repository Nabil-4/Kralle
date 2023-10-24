const express = require('express')

const router = express.Router()

router.post('', (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite : "none"
    }).status(200).json("Utilisateur déconnecté")
})


module.exports = router
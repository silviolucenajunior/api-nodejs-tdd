const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountModel = mongoose.Model('Account')

module.exports = () => {
    router.post('singup/', new SingupRouter().route)
}

class SingupRouter {
    async route(request, response) {
        const { email, password, repeatPassword } = request.body
        if (password === repeatPassword) {
            const client = await AccountModel.create({ email, password })
            return response.json(client)
        }
        response.status(400).json({ error: 'Passwords don\'t match' })
    }
}
const express = require('express')
const router = express.Router()


module.exports = () => {
    const route = new SingupRouter()
    router.post('singup/', ExpressAdapterRouter.adapt(route))
}

class ExpressAdapterRouter {
    static adapt(router) {
        return async(request, response) => {
            const HttpRequest = {
                body: request.body
            }
            const httpResponse = await router.route(HttpRequest)
            return response.status(httpResponse.status).json(httpResponse.body)
        }
    }
}
class SingupRouter {
    async route(httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body
        const client = new SingupUserCase().singup(email, password, repeatPassword)
        return {
            status: 200,
            body: client
        }
    }
}

class SingupUserCase {
    singup(email, password, repeatPassword) {
        if (password === repeatPassword) {
            return new AddAccountRepository().add(email, password)
        }
    }
}

const mongoose = require('mongoose')
const AccountModel = mongoose.Model('Account')
class AddAccountRepository {
    async add(email, password) {
        const client = await AccountModel.create({ email, password })
        return client
    }
}
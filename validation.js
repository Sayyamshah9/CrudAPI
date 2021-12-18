const Joi = require('joi')

const validReg = register => {

    const regUser = Joi.object({

        username: Joi.string().min(1).required(),
        emailid: Joi.string().email().required(),
        password:Joi.string().min(1).required(),
        confirm: Joi.string().min(1).valid(Joi.ref('password')).required()

    })
    return regUser.validate(register)
}

const validLogin = login => {

    const loginUser = Joi.object({

        emailid: Joi.string().email().required(),
        password:Joi.string().min(1).required()

    })
    return loginUser.validate(login)
}

module.exports.validReg = validReg
module.exports.validLogin = validLogin
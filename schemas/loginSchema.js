

import Joi from "joi"

const signinSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(4).required()
})

export default signinSchema;
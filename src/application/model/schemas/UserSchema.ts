import { celebrate, Joi, Segments } from 'celebrate'

export const UserSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        type: Joi.string().required(),
        profiles: Joi.array().items(Joi.string().valid('INVESTOR', 'ADMIN'))
    })
}, { abortEarly: false })
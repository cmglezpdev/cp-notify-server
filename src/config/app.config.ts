import * as Joi from 'joi';


export const JoiValidationSchema = Joi.object({
    DB_HOST: Joi.required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.required(),
    DB_PASSWORD: Joi.required(),
    DB_NAME: Joi.required().default('CPNotify'),
    PORT: Joi.number().default(4000),
    JWT_SECRET: Joi.required()
});


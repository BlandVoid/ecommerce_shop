import Joi from "joi"

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(56).required().trim(),
  email: Joi.string().email().required().min(3).max(256).lowercase().trim(),
  password: Joi.string().alphanum().required().min(6).max(256).trim(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
})

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(56).required().trim(),
  password: Joi.string().alphanum().required().min(6).max(256).trim(),
})

export const authUpdateSchema = Joi.object({
  first_name: Joi.string().required().alphanum().min(1).max(56),
  last_name: Joi.string().required().alphanum().min(1).max(56),
  email: Joi.string().email().required().min(3).max(256).lowercase().trim(),
})

export const passwordUpdateSchema = Joi.object({
  password: Joi.string().alphanum().required().min(6).max(256).trim(),
  new_password: Joi.string().alphanum().required().min(6).max(256).trim(),
  confirm_new_password: Joi.any()
    .equal(Joi.ref("new_password"))
    .required()
    .label("Confirm new password")
    .messages({ "any.only": "{{#label}} does not match" }),
})

export const newOrderSchema = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().valid("usa", "uk", "no").required().alphanum(),
  zip: Joi.string().required().alphanum(),
  order_products: Joi.array().required(),
})

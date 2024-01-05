import Joi from "joi";
export const customer_register_validation = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(4).max(30).required().trim(),
      gender: Joi.string().min(4).max(7).required().trim(),
      address: Joi.string().min(4).max(30).trim(),
      mobile: Joi.number(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(403).json(error.details[0].message);
    }
    next()
};
export const customer_edit_validation = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(4).max(30).required().trim(),

      gender: Joi.string().min(4).max(7).required().trim(),

      address: Joi.string().min(4).max(30).trim(),

      mobile: Joi.string().min(9).max(9).required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(403).json(error.details[0].message);
    }
    next();
};












import chalk from "chalk";
import Joi from "joi";
export const order_register_validation = (req, res, next) => {
  const schema = Joi.object({
    pickup_location: Joi.string().min(1).max(120).required().trim(),
    delivery_location: Joi.string().min(1).max(120).required().trim(),
    weight: Joi.string().min(1).max(20).required().trim(),
    status: Joi.string().min(1).max(20).required().trim(),
    customer: Joi.string().min(1).max(30).required().trim(),
    vehicle: Joi.string().required().trim(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(`${chalk.red.bold("Order register validation : ")}` + error);
    return res.status(403).json(error.details[0].message);
  }
  next();
};
export const order_update_validation = (req, res, next) => {
  const schema = Joi.object({
    pickup_location: Joi.string().min(1).max(120).required().trim(),
    delivery_location: Joi.string().min(1).max(120).required().trim(),
    weight: Joi.string().min(1).max(20).required().trim(),
    status: Joi.string().min(1).max(20).required().trim(),
    customer: Joi.string().min(1).max(30).required().trim(),
    vehicle: Joi.string().required().trim(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(`${chalk.red.bold("Order update validation : ")}` + error);
    return res.status(403).json(error.details[0].message);
  }
  next();
};

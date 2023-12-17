import chalk from "chalk";
import Joi from "joi";
export const routes_register_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
        source_location: Joi.string().min(3).max(30).required().trim(),
        destination_location: Joi.string().min(3).max(30).required().trim(),
        distance: Joi.string().min(3).max(30).required().trim(),
        estimated_time: Joi.string().min(2).max(30).required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Routes registration validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
export const routes_update_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
        source_location: Joi.string().min(3).max(30).required().trim(),
        destination_location: Joi.string().min(3).max(30).required().trim(),
        distance: Joi.string().min(3).max(30).required().trim(),
        estimated_time: Joi.string().min(2).max(30).required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Routes updated validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};

import chalk from "chalk";
import Joi from "joi";
export const maintenance_record_register_validation = (req, res, next) => {
    const schema = Joi.object({
      type: Joi.string().min(3).max(80).required().trim(),
      description: Joi.string().min(1).max(150).trim(),
      cost: Joi.string().min(1).max(30).required().trim(),
      vehicle: Joi.string().required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Maintenance record registration validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
};
export const maintenance_record_update_validation = (req, res, next) => {
    const schema = Joi.object({
      type: Joi.string().min(3).max(80).required().trim(),
      description: Joi.string().min(1).max(150).trim(),
      cost: Joi.string().min(1).max(30).required().trim(),
      vehicle: Joi.string().required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Maintenance record updated validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
};

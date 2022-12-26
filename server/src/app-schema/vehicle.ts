import joi from "joi";

const VehicleSchemaReq = joi
  .object({
    title: joi.string().min(3).max(50).required(),
    category: joi.string().min(3).max(100).required(),
    description: joi.string().max(1000),
    list_price: joi.number().required(),
    net_price: joi.number().required(),
    quantity_available: joi.number().required(),
  })
  .required();

const VehicleSchemaDB = joi
  .object({
    vehicle_id: joi.string().required(),
    title: joi.string().min(3).max(50).required(),
    category: joi.string().min(3).max(100).required(),
    description: joi.string().max(1000),
    list_price: joi.number().required(),
    net_price: joi.number().required(),
    quantity_available: joi.number().required(),
    driver_id: joi.string().required(),
  })
  .required();

export { VehicleSchemaReq, VehicleSchemaDB };

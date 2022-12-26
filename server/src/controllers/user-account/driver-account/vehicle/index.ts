import { StatusCodes } from "http-status-codes";
import { VehicleSchemaReq } from "../../../../app-schema/vehicle";
import db from "../../../../db";
import { BadRequestError } from "../../../../errors";
import {
  Status,
  ResponseData,
} from "../../../../types-and-interfaces/routes-processor";
import genSqlUpdateCommands from "../../../helpers/gen-sql-update-commands";
import processRoute from "../../../helpers/process-route";

const { CREATED, OK } = StatusCodes;

let insertVehicleTable = `insert into vehicle (
	title,
	category,
	description,
	list_price,
	net_price,
	quantity_available,
	driver_id
) values ($1, $2, $3, $4, $5, $6, $7) returning vehicle_id`;

const createQuery = [
  async ({ reqData, userId }) => {
    return await db.query(insertVehicleTable, [
      ...Object.values(reqData),
      userId,
    ]);
  },
];

const readAllQuery = [async () => await db.query(`select * from vehicle`)];

const readQuery = [
  async ({ params }) => {
    let { vehicleId } = params;
    return await db.query(`select * from vehicle where vehicle_id=$1`, [
      vehicleId,
    ]);
  },
];

const updateQuery = [
  async ({ params, reqData }) => {
    let { vehicleId } = params,
      updateCommand = genSqlUpdateCommands(
        "vehicle",
        "vehicle_id",
        Object.keys(reqData)
      );
    return await db.query(updateCommand, [
      vehicleId,
      ...Object.values(reqData),
    ]);
  },
];

const deleteQuery = [
  async ({ params }) => {
    let { vehicleId } = params;
    return await db.query(`delete from vehicle where vehicle_id=$1`, [
      vehicleId,
    ]);
  },
];

let validateBody = (data: object): object => {
  const validData = VehicleSchemaReq.validate(data);
  if (validData.error)
    throw new BadRequestError(
      "Invalid Data Schema: " + validData.error.message
    );
  return validData.value;
};

let validateResult = (result: any, status: Status): ResponseData => {
  if (result.rowCount === 0)
    return {
      status: 404,
      data: { msg: "Route does not exit" },
    };
  return {
    status,
    data: result.rows[result.rowCount - 1],
  };
};

let createVehicle = processRoute(
  createQuery,
  { status: CREATED },
  validateBody,
  validateResult
);

let getAllVehicle = processRoute(
  readAllQuery,
  { status: OK },
  undefined,
  validateResult
);

let getVehicle = processRoute(
  readQuery,
  { status: OK },
  undefined,
  validateResult
);

let updateVehicle = processRoute(
  updateQuery,
  { status: OK },
  undefined,
  validateResult
);

let deleteVehicle = processRoute(
  deleteQuery,
  { status: OK },
  undefined,
  validateResult
);

export {
  createVehicle,
  getAllVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};

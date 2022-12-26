import { StatusCodes } from "http-status-codes";
import path from "path";
import Joi from "joi";
import app from "../../../../app";
import { VehicleSchemaDB } from "../../../../app-schema/vehicle";
import {
  vehicleData,
  updateVehicleData,
} from "../../../accounts/user/driver-account/vehicle/data";
import testProcessRoute from "../../test-process-route";
const filename = path.basename(__filename);

const { CREATED, OK, NOT_FOUND } = StatusCodes;

let checkId = (data: any) => {
  data.should.have.property("vehicle_id");
  data.vehicle_id.should.be.a("string");
};

let validateResult = (data: any) => {
  let vehicleInfo = data;
  vehicleInfo.should.be.an("object");
  Joi.assert(vehicleInfo, VehicleSchemaDB);
};

const routeParams = {
  server: app,
  parameter: "vehicleIds",
  baseUrl: `/api/v1/user/driver/vehicle`,
  statusCode: OK,
};

const testCreateVehicle = testProcessRoute({
  ...routeParams,
  verb: "post",
  statusCode: CREATED,
  dataMatrix: vehicleData,
  checks: checkId,
});

const testGetAllVehicle = testProcessRoute({
  ...routeParams,
  verb: "get",
  checks: validateResult,
});

const testGetVehicle = testProcessRoute({
  ...routeParams,
  verb: "get",
  checks: validateResult,
});

const testUpdateVehicle = testProcessRoute({
  ...routeParams,
  verb: "put",
  dataMatrix: updateVehicleData,
});

const testDeleteVehicle = testProcessRoute({
  ...routeParams,
  verb: "delete",
});

const testGetNonExistentVehicle = testProcessRoute({
  ...routeParams,
  verb: "get",
  statusCode: NOT_FOUND,
});

export {
  testCreateVehicle,
  testGetAllVehicle,
  testGetVehicle,
  testUpdateVehicle,
  testDeleteVehicle,
  testGetNonExistentVehicle,
};

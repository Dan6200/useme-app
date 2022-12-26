import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import app from "../../../../app";
import testProcessRoute from "../../test-process-route";
// import path from 'path';
chai.use(chaiHttp).should();

const routeParams = {
  server: app,
  baseUrl: "/api/v1/user/passenger",
};

const testCreatePassenger = testProcessRoute({
  ...routeParams,
  verb: "post",
  statusCode: StatusCodes.CREATED,
});

const testGetPassenger = testProcessRoute({
  ...routeParams,
  verb: "get",
  statusCode: StatusCodes.OK,
});

const testDeletePassenger = testProcessRoute({
  ...routeParams,
  verb: "delete",
  statusCode: StatusCodes.NO_CONTENT,
});

const testGetNonExistentPassenger = testProcessRoute({
  ...routeParams,
  verb: "get",
  statusCode: StatusCodes.NOT_FOUND,
});

export {
  testCreatePassenger,
  testGetPassenger,
  testDeletePassenger,
  testGetNonExistentPassenger,
};

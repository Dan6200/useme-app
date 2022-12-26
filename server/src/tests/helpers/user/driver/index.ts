import chai from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import app from "../../../../app";
import testProcessRoute from "../../test-process-route";
// import path from 'path';
chai.use(chaiHttp).should();

const routeParams = {
  server: app,
  baseUrl: "/api/v1/user/driver",
};

const testCreateDriver = testProcessRoute({
  verb: "post",
  statusCode: StatusCodes.CREATED,
  ...routeParams,
});

const testGetDriver = testProcessRoute({
  ...routeParams,
  verb: "get",
  statusCode: StatusCodes.OK,
});

const testDeleteDriver = testProcessRoute({
  ...routeParams,
  verb: "delete",
  statusCode: StatusCodes.NO_CONTENT,
});

const testGetNonExistentDriver = testProcessRoute({
  ...routeParams,
  verb: "get",
  statusCode: StatusCodes.NOT_FOUND,
});

export {
  testCreateDriver,
  testGetDriver,
  testDeleteDriver,
  testGetNonExistentDriver,
};

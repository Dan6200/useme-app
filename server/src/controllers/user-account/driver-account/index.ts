import { StatusCodes } from "http-status-codes";
import db from "../../../db";
import {
  Status,
  ResponseData,
} from "../../../types-and-interfaces/routes-processor";
import processRoute from "../../helpers/process-route";
const { CREATED, OK, NO_CONTENT } = StatusCodes;

const createQuery = [
    ({ userId }) =>
      db.query(`insert into driver values($1) returning driver_id`, [userId]),
  ],
  readQuery = [
    ({ userId }) =>
      db.query(`select * from driver where driver_id=$1`, [userId]),
  ],
  deleteQuery = [() => db.query(`delete from driver`)],
  validateResult = (result: any, status: Status): ResponseData => {
    if (result.rowCount === 0) {
      if (result.command === "SELECT") {
        return {
          status: 404,
          data: "Route does not exit",
        };
      }
      if (result.command === "INSERT")
        throw new Error("INSERT operation failed");
    }
    return {
      status,
      data: result.rows[result.rowCount - 1],
    };
  };

let createDriverAccount = processRoute(
    createQuery,
    { status: CREATED },
    undefined,
    validateResult
  ),
  getDriverAccount = processRoute(
    readQuery,
    { status: OK },
    undefined,
    validateResult
  ),
  deleteDriverAccount = processRoute(
    deleteQuery,
    { status: NO_CONTENT },
    undefined
  );

export { createDriverAccount, getDriverAccount, deleteDriverAccount };

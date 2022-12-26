import { StatusCodes } from "http-status-codes";
import db from "../../../db";
import {
  Status,
  ResponseData,
} from "../../../types-and-interfaces/routes-processor";
import processRoute from "../../helpers/process-route";
const { CREATED, OK, NO_CONTENT } = StatusCodes;

const createQuery = [
    ({ userId }) => db.query(`insert into passenger values($1)`, [userId]),
  ],
  readQuery = [
    ({ userId }) =>
      db.query(`select * from passenger where passenger_id=$1`, [userId]),
  ],
  deleteQuery = [() => db.query(`delete from passenger`)],
  validateResult = (result: any, status: Status): ResponseData => {
    if (result.rowCount === 0)
      return {
        status: 404,
        data: "Route does not exit",
      };
    return {
      status,
      data: result.rows[result.rowCount - 1],
    };
  };

let createPassengerAccount = processRoute(createQuery, { status: CREATED }),
  getPassengerAccount = processRoute(
    readQuery,
    { status: OK },
    undefined,
    validateResult
  ),
  deletePassengerAccount = processRoute(
    deleteQuery,
    { status: NO_CONTENT },
    undefined
  );

export { createPassengerAccount, getPassengerAccount, deletePassengerAccount };

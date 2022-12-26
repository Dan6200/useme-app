import express from "express";
import {
  createDriverAccount,
  getDriverAccount,
  deleteDriverAccount,
} from "../../../controllers/user-account/driver-account";
const router = express.Router();

router
  .route("/")
  .post(createDriverAccount)
  .get(getDriverAccount)
  .delete(deleteDriverAccount);

export default router;

import express from "express";
import {
  createPassengerAccount,
  deletePassengerAccount,
  getPassengerAccount,
} from "../../../controllers/user-account/passenger-account";
const router = express.Router();

router
  .route("/")
  .post(createPassengerAccount)
  .get(getPassengerAccount)
  .delete(deletePassengerAccount);

export default router;

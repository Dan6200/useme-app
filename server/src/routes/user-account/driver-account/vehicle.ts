import express from "express";
import multer from "multer";
import imageStorage from "../../../controllers/helpers/image-storage";
import {
  createVehicle,
  getAllVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../../controllers/user-account/driver-account/vehicle";
const upload = multer({ storage: imageStorage });
import { uploadVehicleImage } from "../../../controllers/user-account/driver-account/vehicle/image";
const router = express.Router();

router.route("/").post(createVehicle).get(getAllVehicle);
router
  .route("/:vehicleId")
  .get(getVehicle)
  .put(updateVehicle)
  .delete(deleteVehicle);

router
  .route("/:vehicleId/image")
  .post(upload.single("vehicleImage"), uploadVehicleImage);

export default router;

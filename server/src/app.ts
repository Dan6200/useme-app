// vim mark
// cspell:ignore middlewares
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
dotenv.config();
// routers
import authRouter from "./routes/auth";
import userAccountRouter from "./routes/user-account";
import passengerAccountRouter from "./routes/user-account/passenger-account";
import driverAccountRouter from "./routes/user-account/driver-account";
import vehicleRouter from "./routes/user-account/driver-account/vehicle";
// middlewares
import errorHandlerMiddleware from "./middleware/error-handler";
import authenticateUser from "./middleware/authentication";
import notFound from "./middleware/not-found";
// import cookieParser from 'cookie-parser';

////////////// Middlewares //////////////
let app: Express = express();
app.set("trust proxy", 1);
/*
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 100,
		standardHeaders: true,
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	})
);
*/
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(morgan("dev"));
// routes
// public
app.use("/api/v1/auth", authRouter);
// user account
app.use("/api/v1/user", authenticateUser, userAccountRouter);
// driver Account
app.use("/api/v1/user/driver", authenticateUser, driverAccountRouter);
app.use("/api/v1/user/driver/shop", authenticateUser, shopRouter);
app.use("/api/v1/user/driver/vehicle", authenticateUser, vehicleRouter);
// passenger account
app.use("/api/v1/user/passenger", authenticateUser, passengerAccountRouter);
// helper middlewares
app.use(errorHandlerMiddleware);
app.use(notFound);
export default app;

import "express-async-errors";
import chai from "chai";
import chaiHttp from "chai-http";
import registration from "../../../../helpers/auth/registration";
import db from "../../../../../db";
import { testCreateDriver } from "../../../../helpers/user/driver";
import {
  testCreateVehicle,
  testGetVehicle,
  testGetAllVehicle,
  testUpdateVehicle,
  testDeleteVehicle,
  testGetNonExistentVehicle,
} from "../../../../helpers/user/driver/vehicle";
chai.use(chaiHttp).should();

export default function testVehicle() {
  after(async () => {
    // deletes all entries from user_account
    await db.query("delete from user_account");
    await db.query("delete from driver");
    await db.query("delete from vehicle");
  });
  beforeEach(async () => {
    // deletes all entries from user_account
    await db.query("delete from user_account");
    await db.query("delete from driver");
    await db.query("delete from vehicle");
  });
  describe("/POST vehicle", () => {
    it("it should create a vehicle for the driver", async () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testCreateVehicle(authTokens)));
  });
  describe("/GET vehicle", () => {
    it(`it should retrieve the driver vehicle`, async () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testCreateVehicle(authTokens))
        .then(({ responseList, authTokens }) => {
          let vehicleIds: string[] = [];
          (responseList as any[]).forEach((response) => {
            const { vehicle_id }: { vehicle_id: string } = response;
            vehicleIds.push(vehicle_id);
          });
          return testGetVehicle(authTokens, vehicleIds);
        }));
  });
  describe("/GET all vehicle", () => {
    it(`it should retrieve all the driver's vehicle`, async () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testCreateVehicle(authTokens))
        .then(({ authTokens }) => testGetAllVehicle(authTokens)));
  });
  describe("/PUT vehicle", () => {
    it("it should update the vehicle for the user", async () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testCreateVehicle(authTokens))
        .then(({ responseList, authTokens }) => {
          let vehicleIds: string[] = [];
          (responseList as any[]).forEach((response) => {
            const { vehicle_id }: { vehicle_id: string } = response;
            vehicleIds.push(vehicle_id);
          });
          return testUpdateVehicle(authTokens, vehicleIds);
        }));
  });
  describe("/DELETE vehicle", () => {
    it("it should delete the vehicle", () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testCreateVehicle(authTokens))
        .then(({ responseList, authTokens }) => {
          let vehicleIds: string[] = [];
          (responseList as any[]).forEach((response) => {
            const { vehicle_id }: { vehicle_id: string } = response;
            vehicleIds.push(vehicle_id);
          });
          return testDeleteVehicle(authTokens, vehicleIds);
        }));
  });
  describe("/GET vehicle", () => {
    it(`it should fail to retrieve the driver vehicle`, () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testCreateVehicle(authTokens))
        .then(({ responseList, authTokens }) => {
          let vehicleIds: string[] = [];
          (responseList as any[]).forEach((response) => {
            const { vehicle_id }: { vehicle_id: string } = response;
            vehicleIds.push(vehicle_id);
          });
          return testDeleteVehicle(authTokens, vehicleIds);
        })
        .then(({ authTokens }) => testGetNonExistentVehicle(authTokens)));
  });
}

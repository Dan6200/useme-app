import "express-async-errors";
import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../../../db";
import registration from "../../../helpers/auth/registration";
import {
  testCreateDriver,
  testGetDriver,
  testDeleteDriver,
  testGetNonExistentDriver,
} from "../../../helpers/user/driver";
chai.use(chaiHttp).should();

export default function testDriverAccount() {
  after(async () => {
    // deletes all entries from user_account
    await db.query("delete from user_account");
    await db.query("delete from driver");
  });
  beforeEach(async () => {
    // deletes all entries from user_account
    await db.query("delete from user_account");
    await db.query("delete from driver");
  });

  describe("/POST driver account", async () => {
    // create new driver account
    it(`it should create new user account then a new driver account`, async () =>
      registration().then((tokens) => testCreateDriver(tokens)));
  });

  describe("/GET driver account", () => {
    it(`it should create a new user account, create a driver account and retrieve the driver account`, async () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testGetDriver(authTokens)));
  });

  describe("/DELETE driver account", () => {
    it("it should create and delete the driver account", async () =>
      registration()
        .then((tokens) => testCreateDriver(tokens))
        .then(({ authTokens }) => testDeleteDriver(authTokens)));
  });

  describe("/GET nonexistent driver account", () => {
    it(`it should fail to retrieve the driver account`, async () =>
      registration().then((tokens) => testGetNonExistentDriver(tokens)));
  });
}

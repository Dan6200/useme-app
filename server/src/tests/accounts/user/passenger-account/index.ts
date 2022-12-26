import "express-async-errors";
import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../../../db";
import registration from "../../../helpers/auth/registration";
import {
  testCreatePassenger,
  testGetPassenger,
  testDeletePassenger,
  testGetNonExistentPassenger,
} from "../../../helpers/user/passenger";
chai.use(chaiHttp).should();

export default function testPassengerAccount() {
  after(async () => {
    // deletes all entries from user_account
    await db.query("delete from user_account");
    await db.query("delete from passenger");
  });
  beforeEach(async () => {
    // deletes all entries from user_account
    await db.query("delete from user_account");
    await db.query("delete from passenger");
  });

  describe("/POST passenger account", async () => {
    // create new passenger account
    it(`it should create new user account then a new passenger account`, async () =>
      registration().then((tokens) => testCreatePassenger(tokens)));
  });

  describe("/GET passenger account", () => {
    it(`it should create a new user account, create a passenger account and retrieve the passenger account`, async () =>
      registration()
        .then((tokens) => testCreatePassenger(tokens))
        .then(({ authTokens }) => testGetPassenger(authTokens)));
  });

  describe("/DELETE passenger account", () => {
    it("it should create and delete the passenger account", async () =>
      registration()
        .then((tokens) => testCreatePassenger(tokens))
        .then(({ authTokens }) => testDeletePassenger(authTokens)));
  });

  describe("/GET nonexistent passenger account", () => {
    it(`it should fail to retrieve the passenger account`, async () =>
      registration().then((tokens) => testGetNonExistentPassenger(tokens)));
  });
}

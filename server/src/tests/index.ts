import Authentication from "./authentication";
import testPassengerAccount from "./accounts/user/passenger-account";
import testDriverAccount from "./accounts/user/driver-account";
import testVehicle from "./accounts/user/driver-account/vehicle";
import testUserAccount from "./accounts/user";

/*
 * All Passed ...
 */
describe("Authentication Routes", Authentication);
describe("User Account Routes", testUserAccount);
/*
describe("Passenger Account Routes", testPassengerAccount);
describe("Driver Account Routes", testDriverAccount);
describe("Vehicle Routes", testVehicle);
*/

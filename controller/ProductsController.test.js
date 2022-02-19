import ProductsController from "./ProductsController.js";
import ProductsModel from "../model/ProductsModel.js";
import DatabaseTest from "../config/Database.test.js";

// Before we run any queries connect to the test database
beforeAll(async () => DatabaseTest.connect());

// Clear the database after each test to ensure consistent results
afterEach(async () => DatabaseTest.clear());

// After all tests are run disconnect from the test database
afterAll(async () => DatabaseTest.disconnect());

describe("ProductsController", () => {


});
require("jest-fetch-mock").enableMocks();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["jest-fetch-mock"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

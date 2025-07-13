export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {},
   coveragePathIgnorePatterns: [ "/src/thirdparty/"]
};

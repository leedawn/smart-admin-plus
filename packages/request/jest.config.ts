module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://api.sandieyun.com", // http://localhost:3000
  },
};

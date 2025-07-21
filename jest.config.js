const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/tests/**/*.test.ts"],
  roots: ["<rootDir>/libs", "<rootDir>/apps"],
  moduleNameMapper: {
    "^@legal/(.*)$": "<rootDir>/libs/$1/src"
  }
};

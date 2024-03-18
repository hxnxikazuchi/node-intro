export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src"],
  silent: false,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*"],
  coverageReporters: ["text"],
  projects: [
    {
      displayName: "test",
      testMatch: ["**/*.unit.spec.ts", "**/*.integration.spec.ts"],
    },
    {
      displayName: "test:e2e",
      testMatch: ["**/*.e2e.spec.ts"],
    },
  ],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
  transform: {
    "^.+\\.ts?$": "babel-jest",
  },
};

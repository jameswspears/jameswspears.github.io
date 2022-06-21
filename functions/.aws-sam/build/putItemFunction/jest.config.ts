const config = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ]
};

export default config;
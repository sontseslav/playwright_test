module.exports = {
    rootDir: '.',
    testTimeout: 20000,
    verbose: true,
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: [
        '<rootDir>/__tests__/*/*.spec.ts',
    ],
    preset: 'jest-playwright-preset',
};

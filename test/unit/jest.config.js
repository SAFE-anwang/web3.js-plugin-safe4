// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('../config/jest.config');

module.exports = {
	...base,
	testMatch: ['<rootDir>/test/unit/**/*.(spec|test).(js|ts)'],
	coverageDirectory: '.coverage/unit',
	collectCoverageFrom: ['src/**'],
};
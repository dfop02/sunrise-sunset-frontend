const nextJest = require('next/jest')
const createJestConfig = nextJest({dir: './'})
module.exports = createJestConfig({
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"]
})
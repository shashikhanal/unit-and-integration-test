# Unit and Integration Testing
This repository serves as a comprehensive introduction for setting up unit and integration tests within Node.js and TypeScript projects. It provides test examples from easy to advanced complexity with pre-configured testing libraries, making it easier for developers/engineers to start writing reliable tests right from the beginning.

## Getting Started
Follow these instructions to set up and run the tests locally.

### Testing libraries used
- [Jest](https://jestjs.io/): testing framework for unit and integration tests.
- [SuperTest](https://www.npmjs.com/package/supertest/): library for testing endpoints.

### Prerequisites
Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/)
- [Nodemon](https://nodemon.io/)

### Installation
1. **Clone the repository:**

   ```bash
   git clone https://github.com/shashikhanal/unit-and-integration-test.git
	```

2. **Navigate to the project directory:**

   ```bash
   cd unit-and-integration-test
	```

3. **Install dependencies:**

   ```bash
   npm install
	```

### Configuration
You can customise the test coverage parameters (e.g. branches, statements, etc.) in the `jest.integration.config.ts` and `jest.unit.config.ts` files. The default configuration is set to:

```json
{
  branches: 80,
  functions: 80,
  lines: 80,
  statements: 80,
}
```

## Running Unit Tests
Once the setup is complete, you can run unit tests with:

```bash
npm run test:unit
```

## Running Integration Tests
Once the setup is complete, you can run integration tests with:

```bash
npm run test:integration
```

## Contributing
Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Open a pull request and describe your changes.

## License
This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). See the LICENSE for details.

## Contact
For any inquiries or issues, feel free to open an issue on GitHub or contact the repository owner directly.

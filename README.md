# Defra WDIO Core

An acceptance test project initiator, keeping much of the WebDriver and WebdriverIO setup outside of the project.

<details>
<summary>PREREQUISITES</summary>

You must use Node.js version 10.x or above. Visit [Node.js](https://nodejs.org/en/) and choose the version for your system.

You must have the Java Development Kit installed. Visit [Oracle](https://www.oracle.com/technetwork/java/javase/downloads/jdk12-downloads-5295953.html) and choose the version for your system.

**Note:** if prompted by your system to install JDK, do not install the version your system recommends; please follow the link above.

</details>

## Getting Started

In terminal, make a project folder:

`mkdir [project-name] && cd [project-name]`

Initialise a Node.js project in that folder:

`npm init`

Install this package as a dependancy of that project:

`npm install https://github.com/DEFRA/defra-wdio-core`

There should then be example tests ready to run using:

`npm start local`

## Isolating Tests

To run isolated tests you can suffix the above command with:

`--spec 01_my_isolated_test.feature`

## Writing Tests

- [Test Frameworks](docs/test-frameworks.md)
- [Step Definitions](docs/step-definitions.md)
- [Core Functions](docs/core-functions.md)
- [Logging](docs/logging.md)

## Hooks

Available hooks are listed in `hooks.conf.js` to be modified as needed. Some experimentation may be needed to produce the desired outcome using the available arguments.

## BrowserStack

To use BrowserStack, add the following environment variables:

```
BROWSERSTACK_ACCESSKEY=[your BrowserStack access key]
BROWSERSTACK_USER=[your BrowserStack username]
```

Then run tests using:

`npm start browserstack`


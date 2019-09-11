# Defra WDIO Core

An acceptance test project initiator, keeping much of the WebDriver and WebdriverIO setup outside of the project.

## Prerequisites

You must use Node.js version 10.x or above. Visit [Node.js](https://nodejs.org/en/) and choose the version for your system.

You must have the Java Development Kit installed. Visit [Oracle](https://www.oracle.com/technetwork/java/javase/downloads/jdk12-downloads-5295953.html) and choose the version for your system.

**Note:** if prompted by your system to install JDK, do not install the version your system recommends; please follow the link above. 

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

## Test Frameworks

Cucumber is set as the default framework in `custom.conf.js`, however this can be changed to Mocha, and there are example tests for that framework too.

When using Cucumber, you can add `@tags` to the top of your feature files and reference them in the `tagExpression` property of the `cucumberOpts` option. This will result in only running tests that meet those conditions. This too can be set in `custom.conf.js`. An example has been provided in the comment blocks.

## Writing Tests

If using Cucumber, there are some Step Definitions included in the Core, simply write features using the following statements (e.g. 'I enter "Rick Sanchez" in the "input" with the "name" of "FullName"):

```
I click the {string} button *
I click the {string} link *
I enter {string} in the {string} with the {string} of {string} *
I select the {string} option {string} *
I select the answer {string} *
I select the dob {string} *
I visit the url {string} *
```

Assertions (e.g. 'it has an "h1" element with the text "Welcome to GOV.UK"):

```
it has {string} on the page *
it has a page title {string} *
it has a/an {string} element with text {string} *
```

When writing your own Step Definitions, or Specs in Mocha, you can access an instance of the `Core` class, from the Core, by requiring it:

```js
const { core } = require('defra-wdio-core')
```

This provides access to the following functions:

```js
core.visit(text[, expectUrlChange, milliseconds])
```
 - this visits the url in the 'text' argument [with an optional 'expectUrlChange' argument to specify whether a url change is expected, and an optional 'milliseconds' argument to specify a delay before visiting the url].

```js
core.clickButton(text[, expectUrlChange])
```
  - this clicks a button with the 'text' argument on it [with an optional 'expectUrlChange' argument to specify whether a url change is expected].

```js
core.clickLink(text[, expectUrlChange])
```
  - this clicks a link with the 'text' argument on it [with an optional 'expectUrlChange' argument to specify whether a url change is expected].

```js
core.clickLabel(text)
```
  - this clicks a label with the 'text' argument on it; this can be used when a label wraps a radio input.

```js
core.click(type[, text, expectUrlChange, ...attributes])
```
  - this clicks an element identified using the selector in the 'type' argument [with an optional 'text' argument that the element should contain, with an optional 'expectUrlChange' argument to specify whether a url change is expected, and optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].

  - examples:

    - core.click('input[type='radio']', null, false, 'value', 'yes')
    - core.click('a', 'More information', true)

```js
core.selectByLabel(text, option)
```
  - this selects the 'option' argument from a drop-down list when it is wrapped in a label with the 'text' argument on it.

```js
core.select(option, ...attributes)
```
  - this selects the 'option' argument from a drop-down list using pairs of attribute and corresponding values from the 'attributes' argument.

  - example:

    - core.select('September', 'name', 'response[month]')

```js
core.selectDob(text)
```
  - this selects each option when the date of birth input is made up of seperate 'Day', 'Month', and 'Year' drop-down lists wrapped in corresponding label; the format should be as the options appear written in the drop-down list's, seperated by spaces (e.g. "1 January 1970").

```js
core.enter(type, text[, ...attributes])
```
  - this enters the 'text' argument in the input of the 'type' argument [with optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].

  - examples:

    - core.enter('textarea', 'Hello world!')
    - core.enter('input[type='text']', '2 Temple Quay House', 'name', 'AddressLine1')
    - core.enter('input[type='password']', 'Password123',)

```js
core.hasTitle(text[, milliseconds])
```
  - this asserts that the page title matches the 'text' argument [with an optional 'milliseconds' argument to specify a delay before trying].

```js
core.hasText(text[, milliseconds])
```
  - this asserts that the page contains any element that matches the 'text' argument [with an optional 'milliseconds' argument to specify a delay before trying].

```js
core.hasElement(type, text[, milliseconds, ...attributes])
```
  - this asserts that the page contains an element matching the selector in the 'type' argument and containing the text in the 'text' argument [with an optional 'milliseconds' argument to specify a delay before trying, and and optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].

```js
core.get(selector[, text, milliseconds, log, index])
```
  - if found, this returns the element [at the optional 'index' argument from an array of elements] matching the 'selector' argument [with an optional 'text' argument that the element should contain, with an optional 'milliseconds' argument to specify a delay before trying, and an optional 'log' argument to specify whether to output the count of the number of elements found to the console]
  
  - by default, if more than one element is found, it will output the count to the console before returning the element at the given index

  - if no elements are found, it saves a screenshot of the current browser window before throwing an error
  
  - if elements are found but fewer than the given index, it saves a screenshot of the current browser window before throwing an error
  
  - it will continue to look for matching elements for the length of 'waitforTimeout' (set in WDIO Options in the config)

```js
core.set(selector, text)
```
  - this gets an element matching the 'selector' argument and sets the value equal to the 'text' argument

  - example:

    - core.set('input[type='text'][name='AddressLine1']', '2 Temple Quay House')

```js
core.screenshot([location, prefix])
```
  - this saves a screenshot [with the optional argument to specify a location, and an optional argument to specify a prefex]
  
  - the default location is ./'logs/error-screenshots/', and the prefix 'error', the remainder of the filename being made up of a date and a timestamp, followed by the browser under test.

```js
core.wait(milliseconds)
```
  - this has the browser wait for the number of 'milliseconds' argument

You can also require the `Core` class itself and use it to create instances or extend your own classes:

```js
const { Core } = require('defra-wdio-core')
```

## Logging

Basic functions to output to the console with context colours are available. You can require these with:

```js
const { infoMsg, warningMsg } = require('defra-wdio-core')
```

These functions accept the same arguments:

```js
infoMsg(prefix, content) / warningMsg(prefix, content)
```

The exact colour is dependent on your system settings. Using this: `infoMsg('Feature', 'Visit GOV.UK')`, would output this: `Feature: Visit GOV.UK`, with `Feature:` in blue.

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


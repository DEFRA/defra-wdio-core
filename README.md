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

If using Cucumber, there are some Step Definitions included in the Core, simply write features using the following statements (e.g. 'I click the "Continue" button'):

```
I visit the url {string} *
I click the {string} button *
I click the {string} link *
I select the answer {string} *
I select the {string} option {string} *
I select the dob {string} *
I enter {string} in the email field *
I enter {string} in the password field *
I enter {string} in the search field *
I enter {string} in the text field *
I enter {string} in the text area *
```

When there are more than one element with the same text (e.g. 'I click the 3rd "More info" link'):

```
I click the {} {string} link *
I click the {} {string} button *
I select the {} answer {string} *
I select the {} {string} option {string} *
I enter {string} in the {} email field *
I enter {string} in the {} password field *
I enter {string} in the {} search field *
I enter {string} in the {} text field *
I enter {string} in the {} text area *
```

Assertions (e.g. 'it has an "h1" element with the text "Welcome to GOV.UK"):

```
it has a page title {string} *
it has {string} on the page *
it has a/an {string} element with text {string} *
```

When writing your own Step Definitions, or Specs in Mocha, you can access an instance of the `Page` class in the Core by requiring it:

```js
const { page } = require('defra-wdio-core')
```

This provides access to the following functions:

```js
page.visit(text[, milliseconds])
```
 - visits a url [with an optional argument to specify a delay before trying]

```js
page.clickButton(text[, index])
```
  - clicks a button [with an optional argument to specify an index if more than one button exists with that text]

```js
page.clickLink(text[, index])
```
  - clicks a link [with an optional argument to specify an index if more than one link exists with that text]

```js
page.selectAnswer(text[, index])
```
  - selects a radio button answer [with an optional argument to specify an index if more than one radio button answer exists with that text]

```js
page.selectOption(text, option[, index])
```
  - selects an option from a drop-down list [with an optional argument to specify an index if more than one drop-down list exists with that text]

```js
page.selectDob(text)
```
  - selects each option when the date of birth section is made up of seperate 'Day' 'Month' and 'Year' drop-down lists; the format should be as they appear written in the drop-down lists, seperated by spaces (e.g. "1 January 1970")

```js
page.formField(type, text[, index])
```
  - enters the text argument in the form field of the type argument [with an optional argument to specify an index if more than one form field of that type exists]

```js
page.textArea(text[, index])
```
  - enters the text argument in the text area [with an optional argument to specify an index if more than one text area exists]

```js
page.hasTitle(text[, milliseconds])
```
  - asserts that the page title matches the text argument [with an optional argument to specify a delay before trying]

```js
page.hasText(text[, milliseconds])
```
  - asserts that the page contains an element that matches the text argument [with an optional argument to specify a delay before trying]

```js
page.hasElement(type, text[, milliseconds])
```
  - asserts that the page contains an element of a specific type that matches the text argument [with an optional argument to specify a delay before trying]

```js
page.get(type, content, index[, milliseconds, log])
```
  - if found, this returns the element at the index argument from an array of elements matching the type and content arguments [with an optional argument to specify a delay before trying, and an optional argument to specify whether to output the count of the number of elements found to the console]
  
  - by default, if more than one element is found, it will output the count to the console before returning the element at the given index

  - if no elements are found, it saves a screenshot of the current browser window before throwing an error
  
  - if elements are found but fewer than the given index, it saves a screenshot of the current browser window before throwing an error
  
  - it will continue to look for matching elements for the length of 'waitforTimeout' (set in WDIO Options in the config)

```js
page.set(type, text[, index])
```
  - gets a form element of the type argument and sets the value equal to the text argument [with an optional argument to specify an index if more than form element of that type exists]

```js
page.screenshot([location, prefix])
```
  - saves a screenshot [with the optional argument to specify a location, and an optional argument to specify a prefex]
  
  - the default location is ./'logs/error-screenshots/', and the prefix 'error', the remainder of the filename being made up of a date and a timestamp, followed by the browser under test.

You can also require the `Page` class itself and use it to create instances or extend your own classes:

```js
const { Page } = require('defra-wdio-core')
```

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


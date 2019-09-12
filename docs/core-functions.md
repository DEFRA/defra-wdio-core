# Core Functions

When writing your own Step Definitions, or Specs in Mocha, you can access an instance of the `Core` class, from the Core, by requiring it:

```js
const { core } = require('defra-wdio-core')
```

You can also require the `Core` class itself and use it to create instances or extend your own classes:

```js
const { Core } = require('defra-wdio-core')
```

Both uses provide access to the following functions:

- [checkUrl](#checkUrl)

- [clear](#clear)

- [click](#click)

- [clickButton](#clickButton)

- [clickButtonByText](#clickButtonByText)

- [clickLabelByText](#clickLabelByText)

- [clickLink](#clickLink)

- [clickLinkByText](#clickLinkByText)

- [enter](#enter)

- [get](#get)

- [hasElement](#hasElement)

- [hasText](#hasText)

- [hasTitle](#hasTitle)

- [screenshot](#screenshot)

- [set](#set)

- [select](#select)

- [selectByLabel](#selectByLabel)

- [selectDob](#selectDob)

- [visit](#visit)

- [wait](#wait)

- _attibutesBuilder

- _checkUrl

- _checkUrlChange



<a name="checkUrl"></a>

```js
core.checkUrl(url)
```
  - this checks the 'url' argument against the current url of the browser, taking a screenshot and throwing an error is the url is not as expected.
  - example:
    - core.checkUrl('http://www.gov.uk')



<a name="clear"></a>

```js
core.clear(type[, ...attributes])
```
  - this gets the element identified using the selector in the 'type' argument, and clears its value [with optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].
  - example:
    - core.clear('input[name="AddressLine1"])



<a name="click"></a>

```js
core.click(type[, text, expectUrlChange, ...attributes])
```
  - this clicks the element identified using the selector in the 'type' argument, and throws an error if the url did or did not change [dependent on an optional 'expectUrlChange' argument (default = false) to specify whether a url change is expected][with an optional 'text' argument (default = null) that the element should equal, and optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].
  - examples:
    - core.click('input[type='radio']', null, false, 'value', 'yes')
    - core.click('a', 'More information', true)



<a name="clickButton"></a>

```js
core.clickButton(selector[, expectUrlChange])
```
  - this clicks the element identified using the 'selector' argument [with an optional 'expectUrlChange' argument (default = true) to specify whether a url change is expected].
  - examples:
    - core.clickButton('#continue')
    - core.clickButton('#toggle', false)



<a name="clickButtonByText"></a>

```js
core.clickButtonByText(text[, expectUrlChange])
```
  - this clicks the button element with the 'text' argument on it [with an optional 'expectUrlChange' argument (default = true) to specify whether a url change is expected].
  - example:
    - core.clickButtonByText('Continue')
    - core.clickButtonByText('Toggle', false)



<a name="clickLabelByText"></a>

```js
core.clickLabel(text)
```
  - this clicks the label with the 'text' argument on it; this can be used when a label wraps a radio input.
  - example:
    - core.clickLabel('Email')



<a name="clickLink"></a>

```js
core.clickLink(selector[, expectUrlChange])
```
  - this clicks the element identified using the 'selector' argument [with an optional 'expectUrlChange' argument (default = true) to specify whether a url change is expected].
  - examples:
    - core.clickLink('#cancel')
    - core.clickLink('#moreinfo', false)



<a name="clickLinkByText"></a>

```js
core.clickLinkByText(text[, expectUrlChange])
```
  - this clicks the button element with the 'text' argument on it [with an optional 'expectUrlChange' argument (default = true) to specify whether a url change is expected].
  - example:
    - core.clickButtonByText('Cancel')
    - core.clickButtonByText('More Info', false)



<a name="enter"></a>

```js
core.enter(type, text[, ...attributes])
```
  - this enters the 'text' argument in the the element identified using the selector in the 'type' argument [with optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].
  - examples:
    - core.enter('textarea', 'Hello world!')
    - core.enter('input[type='text']', '2 Temple Quay House', 'name', 'AddressLine1')
    - core.enter('input[type='password']', 'Password123')



<a name="get"></a>

```js
core.get(selector[, text, milliseconds, log, index])
```
  - if found, this returns the element [at the optional 'index' argument from an array of elements] identified using the 'selector' argument [with an optional 'text' argument (default = null) that the element should equal, with an optional 'milliseconds' argument (default = 0) to specify a delay before trying, and an optional 'log' argument (default = true) to specify whether to output the count of the number of elements found to the console].
  - if more than one element is found, it will output the count to the console before returning the element at the given index.
  - if no elements are found, it saves a screenshot of the current browser window before throwing an error.
  - if elements are found but fewer than the given index, it saves a screenshot of the current browser window before throwing an error.
  - it will continue to try to identify elements for the length of 'waitforTimeout' (set in WDIO Options in the config).
  - examples:
    - core.get('#main')
    - core.get('h1', 'Welcome')
    - core.get('*', 'More info', 0, false, 4)



<a name="hasElement"></a>

```js
core.hasElement(type[, text, milliseconds, ...attributes])
```
  - this asserts that the page contains an element identified using the selector in the 'type' argument [with an optional 'text' argument (default = null) that the element should equal, with an optional 'milliseconds' argument (default = 500) to specify a delay before trying, and optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].
  - examples:
    - core.hasElement('a[href="https://www.gov.uk"]')
    - core.hasElement('h1', 'Welcome')
    - core.hasElement('input', null, 500, 'value', '8')



<a name="hasText"></a>

```js
core.hasText(text[, milliseconds])
```
  - this asserts that the page contains the 'text' argument [with an optional 'milliseconds' argument (default = 500) to specify a delay before trying].
  - example:
    - core.hasText('Hello World')
  


<a name="hasTitle"></a>

```js
core.hasTitle(text[, milliseconds])
```
  - this asserts that the page title equals the 'text' argument [with an optional 'milliseconds' argument (default = 500) to specify a delay before trying].
  - example:
    - core.hasTitle('Google')



<a name="screenshot"></a>

```js
core.screenshot([prefix, location])
```
  - this saves a screenshot [with the optional 'prefix' argument (default = 'error') to specify the start of the filename, and an optional 'location' argument (default = './'logs/error-screenshots/') to specify a filepath].
  - the screenshot will be saved in the filepath, the filename made up of the prefix, the date and a timestamp, followed by the browser under test.
  - example:
    - core.screenshot()
    - core.screenshot('success')



<a name="set"></a>

```js
core.set(selector, text)
```
  - this gets the element identified using the 'selector' argument and sets the value equal to the 'text' argument
  - example:
    - core.set('input[type='text'][name='AddressLine1']', '2 Temple Quay House')



<a name="select"></a>

```js
core.select(type, option[, ...attributes])
```
  - this selects the 'option' argument from a drop-down list identified using the selector in the 'type' argument [with optional 'attributes' arguments; the 'attributes' arguments should be in pairs of attribute and corresponding value].
  - examples:
    - core.select('#month', 'September')
    - core.select('input[type='select'], 'September', 'name', 'response[month]')



<a name="selectByLabel"></a>

```js
core.selectByLabel(text, option)
```
  - this selects the 'option' argument from a drop-down list when it is wrapped in a label equal to the 'text' argument.
  - example:
    - core.selectByLabel('Month', 'September')



<a name="selectDob"></a>

```js
core.selectDob(text)
```
  - this selects each option when the date of birth input is made up of seperate 'Day', 'Month', and 'Year' drop-down lists wrapped in corresponding label; the format should be as the options appear written in the drop-down list's, seperated by spaces.
  - example:
    - core.selectDob('17 May 1976')



<a name="visit"></a>

```js
core.visit(text[, expectUrlChange, milliseconds])
```
  - this visits the url in the 'text' argument [with an optional 'expectUrlChange' argument to specify whether a url change is expected, and an optional 'milliseconds' argument to specify a delay before visiting the url].
  - example:
    - core.visit('https://www.gov.uk)



<a name="wait"></a>

```js
core.wait(milliseconds)
```
  - this has the browser wait for the number of 'milliseconds' argument
  - example:
    - core.wait(5000)



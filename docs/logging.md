# Logging

Basic functions to output to the console with context colours are available. You can require these with:

```js
const { infoMsg, warningMsg } = require('defra-wdio-core')
```

These functions accept the same arguments:

```js
infoMsg(prefix, content) / warningMsg(prefix, content)
```

The exact colour is dependent on your system settings. Using this: `infoMsg('Feature', 'Visit GOV.UK')`, would output this: `Feature: Visit GOV.UK`, with `Feature:` in blue.
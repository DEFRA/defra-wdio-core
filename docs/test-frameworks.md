# Test Frameworks

Cucumber is set as the default framework in `custom.conf.js`, however this can be changed to Mocha, and there are example tests for that framework too.

When using Cucumber, you can add `@tags` to the top of your feature files and reference them in the `tagExpression` property of the `cucumberOpts` option. This will result in only running tests that meet those conditions. This too can be set in `custom.conf.js`. An example has been provided in the comment blocks.
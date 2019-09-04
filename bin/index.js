#!/usr/bin/env node

'use strict'

if (!process.env.npm_config_global) require('../src/install')()

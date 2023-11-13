'use strict';
const { createHash } = require("node:crypto");
require('dotenv').config()
module.exports =  (value) => createHash(process.env.CRYPTO_ALGO).update(value).digest('hex');
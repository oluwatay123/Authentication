const crypto = require('crypto');

function generateJwtSecret() {
    return crypto.randomBytes(64).toString('hex');
}

console.log(generateJwtSecret());

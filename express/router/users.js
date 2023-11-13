
const hash = require('../../utils/hash')

exports.getUser = async Users => async (username, password) => await Users.findOne({
    where: {
        username: hash(username),
        password: hash(password)
    }
});
const {
    dbs
} = require('../dbs');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const USERS = 'users';

exports.detail = async (id) => {
    const results = await dbs.production.collection(USERS).find({
            _id: ObjectId(id)
        })
        .toArray();
    return results[0];
};

exports.get = async (username) => {
    return await dbs.production.collection(USERS).findOne({
        username
    });
};

module.exports.add = async (user) => {
    return await dbs.production.collection(USERS).insertOne(user);
};

exports.verify = async (username, password) => {
    const user = await dbs.production.collection(USERS).findOne({
        username: username
    })
    if (user)
        return undefined;
    // verify password
    // ...
    return results[0];
};

exports.validPassword = async function (username, password) {
    const user = await this.get(username);
    if (!user)
        return false;
    return await bcrypt.compare(password, user.password);
};

exports.check = async (username) => {
    const user = await dbs.production.collection(USERS).findOne({
        username
    });
    if (user)
        return true;
    return false;
};
/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let passwordHash = require('password-hash');

let User = {

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 8
        },
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        createdAt: {
            type: 'number',
            autoCreatedAt: true
        },
        updatedAt: {
            type: 'number',
            autoUpdatedAt: true
        },
        // customToJSON: function () {
        //     let element = this.toObject();
        //     delete element.password;
        //     return element;
        // }
    },

    beforeCreate: function (values, next) {
        // Создаем зашифрованную запись пароля в БД
        let minPass = passwordHash.generate(values.password);
        values.encryptPassword = minPass;
        next();
    }

};

module.exports = User;
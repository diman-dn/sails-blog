/**
 * Post.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      title: {
          type: 'string',
          maxLength: 120,
          required: true
      },
      description: {
          type: 'string',
          required: true
      },
      content: {
          type: 'string',
          required: true
      },
      alias: {
          type: 'string',
          maxLength: 50,
          required: true,
          unique: true
      },
      createdAt: {
          type: 'number',
          autoCreatedAt: true
      },
      updatedAt: {
          type: 'number',
          autoUpdatedAt: true
      }
  },

};


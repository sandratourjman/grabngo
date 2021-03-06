'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    title: {
    	allowNull: false,
    	type:DataTypes.STRING
    },
    purchased: {
    	allowNull: false,
      defaultValue: false,
    	type: DataTypes.BOOLEAN
    },
    listId: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: "CASCADE"
    });

    Item.addScope('itemsFor', (listId) => {
       return {
         include: [{
           model: models.List,
           as: "List"
         }],
         where: { listId: listId },
         order: [['createdAt', 'ASC']]
       }
    });
  };
  return Item;
};
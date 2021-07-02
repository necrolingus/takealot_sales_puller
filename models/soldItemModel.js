module.exports = (sequelize, Sequelize) => {
  const soldItemModel = sequelize.define("soldItemModel", {
    order_item_id: {
      type: Sequelize.STRING
    },
    order_id: {
      type: Sequelize.STRING
    },
    order_date: {
      type: Sequelize.STRING
    },
    sale_status: {
      type: Sequelize.STRING
    },
	offer_id: {
      type: Sequelize.STRING
    },
	tsin: {
      type: Sequelize.STRING
    },
	sku: {
      type: Sequelize.STRING
    },
	product_title: {
      type: Sequelize.STRING
    },
	takealot_url_mobi: {
      type: Sequelize.STRING
    },
	selling_price: {
      type: Sequelize.STRING
    },
	quantity: {
      type: Sequelize.INTEGER
    },
	dc: {
      type: Sequelize.STRING
    },
	customer: {
      type: Sequelize.STRING
    },
	takealot_url: {
      type: Sequelize.STRING
    }
  },{
	tableName: 'soldItemModel'
  });

  return soldItemModel;
};

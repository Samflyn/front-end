const Product = require('../database/usingMongoose');

const ITEMS_PER_PAGE = 2;
let totalItems;

exports.getIndex = (request, response, next) => {
  const page = +request.query.page || 1; // page is query param from url
  Product.Product.find()
    .countDocuments()
    .then((total) => {
      totalItems = total;
      return Product.Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((items) => {
      response.render('page', {
        products: items,
        total: totalItems,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevoiusPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((error) => console.log(error));
};

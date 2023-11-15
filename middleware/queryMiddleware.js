exports.processQueryString = (req, res, next) => {
  const { query } = req;
  const excludedFileds = ['page', 'limit', 'fileds', 'sort'];
  excludedFileds.forEach((el) => delete query[el]);
  //Additional query string processing logic
  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  req.parsedQuery = JSON.parse(queryStr);
  next();
};

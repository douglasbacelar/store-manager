const invalidProductName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
 return res.status(422)
  .json({ message: '"name" length must be at least 5 characters long' }); 
}
  return next();
};

const invalidUpdateIdProductName = (req, res, next) => {
  const { productId } = req.params;
  if (!productId) return res.status(404).json({ message: 'Product not found' });
  return next();
};

module.exports = {
  invalidProductName,
  invalidUpdateIdProductName,
};
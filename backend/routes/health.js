exports.health = (req, res) => {
  const { name, email } = req.body;
  return res.send("health is ok");
};

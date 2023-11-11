const fs = require('fs');
const express = require('express');
const router = express.Router();

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    totalUser: users.length,
    data: {
      users,
    },
  });
};
router.route('/').get(getAllUsers);
module.exports = router;

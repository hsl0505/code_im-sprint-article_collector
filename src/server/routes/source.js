const express = require('express');
const fileHelper = require('../helpers/file');

const router = express.Router();

// GET /source
router.get('/', async (req, res) => {
  // TODO: read the content from source.txt using fileHelper
  const temp = await fileHelper.readSourceListFile()
  console.log(temp)

  res.status(200).send(temp)
});

// POST /source
router.post('/', async (req, res) => {
  // TODO: save the content to source.txt using fileHelper
  await fileHelper.writeSourceListFile(req.body)

  res.sendStatus(200)
});

module.exports = router;

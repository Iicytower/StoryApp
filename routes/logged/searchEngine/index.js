const Router = require("express");
const router = Router();

const searchByFilters = require("../../../controllers/searchEngine/searchByFilters");
const searchById = require("../../../controllers/searchEngine/searchById");
const searchByUser = require("../../../controllers/searchEngine/searchByUser");

router.use('/filterSearch', searchByFilters.filterSearcher); //rename when u have method name
router.use('/idSearch', searchById.idSearcher); //rename when u have method name
router.use('/userSearch', searchByUser.userSearcher); //rename when u have method name

module.exports = router;

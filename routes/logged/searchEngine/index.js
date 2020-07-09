const Router = require("express");
const router = Router();

router.use('/filterSearch', require("./searchByFilters")); //rename when u have method name
router.use('/idSearch', require("./searchById")); //rename when u have method name
router.use('/userSearch', require("./searchByUser")); //rename when u have method name

module.exports = router;

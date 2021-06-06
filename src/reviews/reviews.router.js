const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const cors = require("cors")

const corsGet = cors({methods: "GET"});

router.route("/").all(methodNotAllowed);

router
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .options(corsGet)
  .all(methodNotAllowed);

module.exports = router;
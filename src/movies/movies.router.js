const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//need get for /movies?is_showing=true

const cors = require("cors")

const corsGet = cors({methods: "GET"});

router
	.route('/:movieId/reviews')
	.get(cors(), controller.listReviews)
	.options(corsGet)
	.all(methodNotAllowed)

router
	.route('/:movieId/theaters')
	.get(cors(), controller.listTheaters)
	.options(corsGet)
	.all(methodNotAllowed)

router
    .route('/:movieId')
    .get(cors(), controller.read)
	.options(corsGet)
    .all(methodNotAllowed)

router.route("/")
	.get(cors(), controller.list)
	.options(corsGet)
	.all(methodNotAllowed);


module.exports = router;
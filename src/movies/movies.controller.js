const service = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const reduceProperties = require('../utils/reduce-properties')


async function movieExists(req, res, next) {
    const { movieId } = req.params

    const movie = await service.read(movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    return next ({ status: 404, message: 'Movie cannot be found' })
}


async function read(req, res) {
    const { movie: data } = res.locals
    res.json({ data })
}

async function list(req, res, next) {
	if(req.query.is_showing){
		const data = await service.listShowing();
		res.json({ data })
	}
  const data = await service.list();
  res.json({ data });
}

async function listTheaters(req, res, next) {
	const data = await service.listTheaters()
	res.json({ data })
}

async function listReviews(req, res, next) {
  try {
    const reviews = await service.listReviews(req.params.movieId);
    const mappedReviews = reviews.map((review, index) => {
      const {
        review_id,
        content,
        score,
        critic_id,
        movie_id,
        surname,
        preferred_name,
        organization_name,
      } = review;
      return {
        review_id,
        content,
        score,
        critic_id,
        movie_id,
        critic: { surname, critic_id, preferred_name, organization_name },
      };
    });
    res.json({ data: mappedReviews });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list: asyncErrorBoundary(list),
	listTheaters: asyncErrorBoundary(listTheaters),
	listReviews: asyncErrorBoundary(listReviews),
}
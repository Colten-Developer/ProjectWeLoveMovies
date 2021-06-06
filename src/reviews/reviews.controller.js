const service = require('./reviews.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const reduceProperties = require('../utils/reduce-properties')
const mapProperties = require('../utils/map-properties')

async function reviewExists(req, res, next) {
    const { reviewId } = req.params

    const review = await service.read(reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    return next ({ status: 404, message: 'review cannot be found' })
}

async function update(req, res) {
  const updatedReview = {
	...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

	const data = await service.readUpdate(res.locals.review.review_id)

	const fixedData = {
		review_id: data[0].review_id,
		content: data[0].content,
		score: data[0].score,
		created_at: data[0].created_at,
		updated_at: data[0].updated_at,
		movie_id: data[0].movie_id,
		critic_id: data[0].critic_id,
		critic: {
			critic_id: data[0].critic_id,
			preferred_name: data[0].preferred_name,
			surname: data[0].surname,
			organization_name: data[0].organization_name,
			created_at: data[0].created_at,
			updated_at: data[0].updated_at,
		}
	}
	
	const returnObject = {
		...fixedData,
		...updatedReview,
	}
	
	const formattedData = await service.update(updatedReview)
	
	
	res.json({data: returnObject})
	
}

async function destroy(req, res) {
  // your solution here
	await service.delete(res.locals.review.review_id)
	res.sendStatus(204)
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
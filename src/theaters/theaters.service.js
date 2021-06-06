const knex = require("../db/connection");

function list() {
  return knex("theaters as t")
	  .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
	.join('movies as m', 'm.movie_id', 'mt.movie_id')
	  .select('t.theater_id', 't.address_line_1', 't.address_line_2', 't.city', 't.state', 't.zip', 't.name', 'm.movie_id', 'm.title', 'm.rating', 'm.runtime_in_minutes');
}

module.exports = {
  list,
};
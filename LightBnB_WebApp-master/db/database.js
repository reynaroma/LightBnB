/* eslint-disable camelcase */
const { Pool } = require('pg');
const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { response } = require('express');

const config = {
  user: 'labber',
  password: 123,
  host: 'localhost',
  database: 'lightbnb'
}

const pool = new Pool(config);

pool.query(`SELECT title FROM properties LIMIT 10;`)
  .then(response => {

  });

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users
    WHERE email = $1;`, [email])
    .then((res) => {
      // Check if any rows were returned from the query
      if (res.rows.length === 0) {
        // user not found, resolve with null
        return null;
      }
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users
    WHERE id = $1`, [id])
    .then((res) => {
      // Check if any rows were returned from the query
      if (res.rows.length === 0) {
        // user not found, resolve with null
        return null;
      }
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(`INSERT INTO users (name, password, email)
    VALUES($1, $2, $3) RETURNING *;`, [user.name, user.password, user.email])
    .then((res) => {
      const newUser = res.rows[0];
      console.log('New user added:', newUser);
      return newUser;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id = 123, limit = 5) {

  const queryString = `SELECT reservations.*, properties.*,
  AVG(property_reviews.rating)
  FROM reservations
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON property_reviews.id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  return pool
    .query(queryString, [guest_id, limit])
    .then((res) => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

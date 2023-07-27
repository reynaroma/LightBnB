SELECT reservations.id, properties.title,
  reservations.start_date, properties.cost_per_night,
  AVG(property_reviews.rating)
FROM reservations
JOIN properties ON properties.id = property_id
JOIN property_reviews ON property_reviews.id = properties.id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;
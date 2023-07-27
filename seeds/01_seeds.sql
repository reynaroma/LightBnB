INSERT INTO users (name, email, password)
VALUES
  ('John Doe', 'john@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Jane Smith', 'jane@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Alice Johnson', 'alice@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'Cozy Cottage', 'A charming cottage in the countryside', 'thumbnail1.jpg', 'cover1.jpg', 100, 2, 1, 2, 'United States', '123 Countryside St', 'Countryside', 'State', '12345', true),
  (2, 'Luxury Condo', 'Stunning condo with city views', 'thumbnail2.jpg', 'cover2.jpg', 200, 1, 2, 1, 'United States', '456 City Ave', 'City', 'State', '56789', true),
  (3, 'Seaside Villa', 'Beautiful villa by the beach', 'thumbnail3.jpg', 'cover3.jpg', 300, 3, 3, 3, 'United States', '789 Beachfront Rd', 'Beachfront', 'State', '98765', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2023-08-01', '2023-08-05', 1, 2),
  ('2023-09-10', '2023-09-15', 2, 1),
  ('2023-10-20', '2023-10-25', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 1, 1, 5, 'Wonderful stay, highly recommended!'),
  (1, 2, 2, 4, 'Great condo, excellent location.'),
  (3, 3, 3, 5, 'Absolutely loved the villa and the beach view.');
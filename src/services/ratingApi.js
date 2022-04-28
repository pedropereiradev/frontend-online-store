const RATINGS_KEY = 'ratings';

if (!JSON.parse(localStorage.getItem(RATINGS_KEY))) {
  localStorage.setItem(RATINGS_KEY, JSON.stringify([]));
}

const readRatings = () => JSON.parse(localStorage.getItem(RATINGS_KEY));

const saveRating = (rating) => localStorage
  .setItem(RATINGS_KEY, JSON.stringify(rating));

export function getRatings() {
  return readRatings();
}

export function setNewRating(rating) {
  const ratings = readRatings();
  saveRating([...ratings, rating]);
}

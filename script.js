// DOM Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value; // convert to a number with sign '+'

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //   console.log(selectedSeats);

  // To save selected seats, we need to =>

  // Copy selected seats into array with spread operator
  // Map trought array
  // Return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });
  // console.log(seatsIndex);

  // Save into LS
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // setItem need a key and value which transform it JSON format with JSON.stringify

  const selectedSeatsCount = selectedSeats.length;
  //   console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Update price select movie
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  // console.log(e.target.selectedIndex, e.target.value); // select movie
  setMovieData(e.target.selectedIndex, e.target.value); // select movie

  updateSelectedCount();
});

// Selected seats
container.addEventListener('click', e => {
  if (
    // if contains class 'seat' AND NOT contains class 'occupied'
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // Add selected class with toggle => add or remove class 'selected' depend if you click or not
    e.target.classList.toggle('selected');

    // Update Seats and Price
    updateSelectedCount();
  }

  //   console.log(e.target);
});

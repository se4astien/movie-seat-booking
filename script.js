// DOM Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

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
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // JSON stringify => transform seatsIndex into a String before put into LS (selectedSeats)

  const selectedSeatsCount = selectedSeats.length;
  //   console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from LS and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // Now we need to pass it back into an array
  // console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
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

// Initial count and total set
updateSelectedCount();

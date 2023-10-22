const container = document.querySelector(".container");

const infoText = document.querySelector(".infoText");

const totalSeatCount = document.getElementById("count");
const totalPrice = document.getElementById("amount");
const movieSelect = document.getElementById("movie");

const allSeats = document.querySelectorAll(".seat:not(.reserve)");

const saveToDatabase = (willSaveIndex) => {
  const jsonIndex = JSON.stringify(willSaveIndex);
  localStorage.setItem("seatIndex", jsonIndex);
  localStorage.setItem("movieIndex", JSON.stringify(movieSelect.selectedIndex));
};

const getFromDataBase = () => {
  const dbSelectedIndex = JSON.parse(localStorage.getItem("seatIndex"));

  if (dbSelectedIndex !== null) {
    allSeats.forEach((seat, index) => {
      if (dbSelectedIndex.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  movieSelect.selectedIndex = dbSelectedMovie;
};

getFromDataBase();

const createIndex = () => {
  const allSeatsArray = [];

  allSeats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  const allSelectedSeatsArray = [];

  const selectedSeats = container.querySelectorAll(".seat.selected");
  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  const selectedIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  saveToDatabase(selectedIndex);
};

function calculateTotal() {
  createIndex();
  const selectedSeatCounts =
    container.querySelectorAll(".seat.selected").length;
  totalSeatCount.innerText = selectedSeatCounts;

  let selectedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value;

  totalPrice.innerText = selectedSeatCounts * selectedMoviePrice;
  if (selectedSeatCounts > 0) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
}
calculateTotal();

container.addEventListener("click", (pointerEvent) => {
  const clickedSeat = pointerEvent.target.offsetParent;
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserve")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});
movieSelect.addEventListener("change", () => {
  calculateTotal();
});
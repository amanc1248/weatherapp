console.log("Weather app web-server");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {

//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data);
//     }
//   });
// });

// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((data) => {
//     console.log(response.error);

//     if (data.error) {
//       console.log(data.error);
//     } else {
//         console.log(data);
//       console.log(data.forecastData);
//       console.log(data.place);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const searchForm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = ""
// messageTwo.textContent = ""
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...."
  messageTwo.textContent = ""
  const location = searchForm.value;
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        console.log(response.error);

        if (data.error) {
          console.log(data.error);
          messageOne.textContent = "Could not find location";
        } else {
          messageOne.textContent = data.forecastData;
          messageTwo.textContent = data.place;
        }
      });
    }
  );
});
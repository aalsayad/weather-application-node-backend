const weatherForm = document.querySelector("#weather-form");
const searchInput = document.querySelector("#weather-seach-input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  );
});

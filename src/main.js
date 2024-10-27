// === DOM Selection
const selectEl = document.querySelector("#dog-breeds");
const imageEl = document.querySelector("#dog-image");

// === Fetch
// This function returns [breeds]
function getDogsBreed() {
  return fetch(`https://dog.ceo/api/breeds/list/all`)
    .then((res) => res.json())
    .then((data) => Object.keys(data.message))
    .catch((err) => console.log(err));
}

function getDogImage(breed) {
  return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((res) => res.json())
    .then((data) => data.message)
    .catch((err) => console.log(err));
}

// === Render
// Renders the <option>
function renderOptions() {
  getDogsBreed().then((breeds) => {
    for (let breed of breeds) {
      const option = document.createElement("option");
      option.textContent = breed[0].toUpperCase() + breed.slice(1);
      option.value = breed;
      selectEl.appendChild(option);
    }
  });
}

renderOptions();

selectEl.addEventListener("change", (e) => {
  const selectedValue = e.target.value;

  getDogImage(selectedValue).then((link) => (imageEl.src = link));
});
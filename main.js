//  1. Створити сайт використовуючи swapi.dev. вибрати 1 з 6 проперті (films, characters etc..) і зробити запит по них, 
//  вибрати одну з перших проперті що отримаєте і витягнувши з неї "url" - отримати конкретну(планету,фільм, персонажа) 
//  з всією інформацією про нього. Додати кнопку при натисканні на яку вивести всю наявну інформацію на екран красиво структуровано. 

let button = document.querySelector('#button');
let name = document.querySelector('#name');
let population = document.querySelector('#population');
let climate = document.querySelector('#climate');
let terrain = document.querySelector('#terrain');
let gravity = document.querySelector('#gravity');
let diameter = document.querySelector('#diameter');
let rotation = document.querySelector('#rotation');
let orbital = document.querySelector('#orbital');
let residents = document.querySelector('#residents');
let surfaceWater = document.querySelector('#surfaceWater');
let films = document.querySelector('#films');

function getData() {
    
    let randomPlanet = Math.floor((Math.random() * 60) + 1);
    let swApi = `https://swapi.dev/api/planets/${randomPlanet}/`;

    axios.get(swApi).then(response => {
        generateData(response.data);
    }).catch(e => {
        generateDataFail();
    })
}

function generateData(data) {
    name.innerText = data.name;
    rotation.innerText = data.rotation_period;
    orbital.innerText = data.orbital_period;
    diameter.innerText = data.diameter;
    climate.innerText = data.climate;
    gravity.innerText = data.gravity;
    terrain.innerText = data.terrain;
    surfaceWater.innerText = data.surface_water;
    population.innerText = data.population;
    residents.innerText = data.residents;
    films.innerText = data.films;
}

function generateDataFail() {
    name.innerText = 'Something went wrong =(';
}

button.addEventListener('click', getData);

//  2. Використовуючи параметр серч, розробити сайт який буде з допомогою інпута робити пошук за конкретним параметром і виводити дані на сторінку. 
//  (якщо 1 знахідка - вивести всю інфу про айтем, якщо більше 1 то вивести список по філду).

const searchResult = document.querySelector(".search_result");
const searchRequestBtn = document.querySelector("#search_request_btn");
const objectSearchInput = document.querySelector("#object_search_input");
const typeSearchSelect = document.querySelector("#type_search_select");
const personData = document.querySelector(".person_data");

let objArr = [];

searchRequestBtn.addEventListener("click", searchRequest);

async function searchRequest(ev) {
  ev.preventDefault();
  const api = "https://swapi.dev/api/";
  let url = api + "planets" + "/?search=";

  if (objectSearchInput.value.trim() === "") {
    alert("Search field can not be empty!");
  } else {
    url += objectSearchInput.value;
    console.log(url);

    let request = await fetch(url).catch((err) =>
      alert("Server is not responding, error: " + err)
    );
    let response = await request.json();

    if (response.count > 0) {
      fillFields(response);
    } else {
      alert(
        "There is no data for current query: " + objectSearchInput.value
      );
    }
  }
}

function fillFields(resp) {
  objArr = resp.results;

  if (searchResult.children.length !== 0) searchResult.textContent = "";
  if (personData.children.length !== 0) personData.textContent = "";

   
    resp.results.forEach((elem) => liCreate(elem));

    searchResult.addEventListener("click", function (ev) {
      const target = ev.target;
      const obj = objArr.find((item) => item.name === target.textContent);

      if (target.tagName !== "LI") return;
      if (personData.children.length !== 0) personData.textContent = "";

      const contentPersonData = `<p>Planet: ${obj.name}</p>
        <p>Rotation Period: ${obj.rotation_period}</p>
        <p>Orbital Period: ${obj.orbital_period}</p>  
        <p>Diameter: ${obj.diameter}</p>
        <p>Climate: ${obj.climate}</p>
        <p>Gravity: ${obj.gravity}</p>
        <p>Terrain: ${obj.terrain}</p>
        <p>Surface Water: ${obj.surface_water}</p>
        <p>Population: ${obj.population}</p>
        <p>Residents Quantity: ${obj.residents.length}</p>
        <p>Films Quantity: ${obj.films.length}</p>`;

      personData.insertAdjacentHTML("beforeend", contentPersonData);
    });
}

function liCreate(el) {
  const li = document.createElement("li");
  li.textContent = el.name;
  searchResult.append(li);
}

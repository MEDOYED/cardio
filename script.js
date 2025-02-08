import L, { layerGroup } from 'leaflet';

import 'leaflet/dist/leaflet.css';

('use strict');

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

let map;
let mapEvent;

class App {
  #map; // приватні властивості класу
  #mapEvent;

  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Неможливо отримати ваше місцезнаходження');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    // const latitude = position.coords.latitude;

    const { longitude } = position.coords;
    // const longitude = position.coords.longitude;

    console.log(latitude, longitude);
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},5675m/data=!3m1!1e3?authuser=0&entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoASAFQAw%3D%3D`
    );

    this.#map = L.map('map').setView([latitude, longitude], 13);
    // console.log(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup('Тута я')
      .openPopup();

    // Опрацювання кліку на карті
    this.#map.on('click', function (event) {
      this.#mapEvent = event;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleClimbField() {}

  _newWorkout() {}
}

const app = new App();
app._getPosition();

// document.addEventListener('DOMContentLoaded', function () {

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Очищення полей ввода данних
  inputDistance.value = '';
  inputDuration.value = '';
  inputTemp.value = '';
  inputClimb.value = '';

  // відображення маркера
  // const lat = mapEvent.latlng.lat;
  // const lng = mapEvent.latlng.lng;

  const { lat, lng } = mapEvent.latlng; // за допомогою деструктиризації.

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 200,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('тренування')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputClimb.closest('.form__row').classList.toggle('form__row--hidden');
  inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
});

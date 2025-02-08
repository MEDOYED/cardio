import L, { layerGroup } from 'leaflet';

import 'leaflet/dist/leaflet.css';

('use strict');

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--temp');
const inputElevation = document.querySelector('.form__input--climb');

// document.addEventListener('DOMContentLoaded', function () {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      // const latitude = position.coords.latitude;

      const { longitude } = position.coords;
      // const longitude = position.coords.longitude;

      console.log(latitude, longitude);
      console.log(
        `https://www.google.com/maps/@${latitude},${longitude},5675m/data=!3m1!1e3?authuser=0&entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoASAFQAw%3D%3D`
      );

      const map = L.map('map').setView([latitude, longitude], 13);
      // console.log(map);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('Тута я')
        .openPopup();

      map.on('click', function (mapEvent) {
        // const lat = mapEvent.latlng.lat;
        // const lng = mapEvent.latlng.lng;
        const { lat, lng } = mapEvent.latlng;
        // console.log(latitudeWhereClick, longitudeWhereClick);

        L.marker([lat, lng]).addTo(map).bindPopup('Я новий маркер').openPopup();
        // L.marker([lat, lng]).addTo(map).bindPopup(L.popup({})).openPopup();
      });
    },
    function () {
      alert('Неможливо отримати ваше місцезнаходження');
    }
  );
}

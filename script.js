'use strict';

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
    },
    function () {
      alert('Неможливо отримати ваше місцезнаходження');
    }
  );
}

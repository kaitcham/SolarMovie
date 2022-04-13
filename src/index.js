import './style.css';
import header from './modules/header.js';
import movies from './modules/movies.js';

const display = () => {
  header();
  movies();
};

document.addEventListener('DOMContentLoaded', () => {
  display();
});
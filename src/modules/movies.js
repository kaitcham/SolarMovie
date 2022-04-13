const movies = document.querySelector(".content");
const moviesEndPoint = "https://api.tvmaze.com/shows";

export default async () => {
  const response = await fetch(moviesEndPoint);
  const data = await response.json();
  let moviesCode = "";
  for (const [index, movie] of data.entries()) {
    const { id, image, name } = movie;
    if (index >= 8) {
      break;
    }
    moviesCode += `
    <div class="movie-card">
        <img src="${image.original}" alt="KingsMan" />
        <div class="movie-card-details">
            <p>${name}</p>
            <div class="movie-like">
                <i class="fa-regular fa-heart"></i>
                <p>&nbsp; 0</p>
            </div>
        </div>
        <button onclick="showPopup(${id})">Comment</button>
    </div>
    `;
  }
  movies.innerHTML = moviesCode;
};

window.showPopup = (id) => {
    document.querySelector('.popup').style.display = 'block';
}
const movies = document.querySelector('.content');
const popupSection = document.querySelector('.popup-section');
const popup = document.querySelector('.popup');
const moviesEndPoint = 'https://api.tvmaze.com/shows';

export default async () => {
  const response = await fetch(moviesEndPoint);
  const data = await response.json();
  let moviesCode = '';
  /* eslint-disable */
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
  /* eslint-enable */
  movies.innerHTML = moviesCode;
};
const listComments = (comments, commentWrapper) => {
  commentWrapper.innerHTML = '';
  comments.forEach((comment) => {
    commentWrapper.innerHTML += `<div>${comment.username}</div>
    <div>${comment.comment}</div>
    <div>${comment.creation_date}</div>`;
  });
};
window.showPopup = async (id) => {
  popupSection.style.display = 'flex';
  const response = await fetch(moviesEndPoint);
  const data = await response.json();
  const movie = data.filter((movie) => movie.id === id);
  const { name, image, description } = movie[0];
  let popupCode = '';
  popupCode += `
    <div class="popup-image">
        <img src="${image.original}" alt="${name}" />
        </div>
    </div>
    <div class="title">
    <h2>${name}</h2>
  </div>
  <div class="description">
  <p>${description}</p>
  </div>
  <div class="top-comment">
  <h1>Comments</h1>
  </div>
  <div class="commentWrapper"></div>
  <div class="add-comment">
            <h1 class="comment-heading">Add comments</h1>
            <form action="" class="submit-comment">
              <input id="username" type="text" placeholder="your name">
              <textarea name="" id="comment" cols="30" rows="10" placeholder="your insight"></textarea>
              <div class="comment-btn"><button type="submit" id="comment-btn">comment</button></div>
            </form>
        </div>
  `;
  popup.innerHTML = popupCode;
  const input = document.querySelector('#username');
  const textarea = document.querySelector('#comment');
  const submitcomment = document.querySelector('.submit-comment');
  const commentWrapper = document.querySelector('.commentWrapper');
  submitcomment.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      item_id: id,
      username: input.value,
      comment: textarea.value,
    };
    /* eslint-disable */
    const result = await fetch(
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpoqWzBnwFb3zVn24crK/comments",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:5500/",
        },
        body: JSON.stringify(data),
      }
    );
    /* eslint-enable */
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OpoqWzBnwFb3zVn24crK/comments?item_id=${id}`,
    );

    const comments = await response.json();
    listComments(comments, commentWrapper);
  });
};

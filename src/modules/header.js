import Logo from "../images/logo.png";

const header = document.querySelector("header");

export default () => {
  let headerCode = "";
  headerCode += `
    <img class="logo" src="${Logo}" alt="logo" />
    <nav>
        <ul class="categories">
          <li>Movies</li>
          <li>TV Shows</li>
        </ul>
    </nav>
`;
  header.innerHTML = headerCode;
};

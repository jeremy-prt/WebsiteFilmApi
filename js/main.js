let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // Si le champ input est vide

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg"> Merci d'entrer un nom de film</h3> `;
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Si le film existe dans la BDD
        if (data.Response == "True") {
          result.innerHTML = `
                <div class="info">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="assets/star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                    
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join(
                              "</div><div>"
                            )}</div>
                        </div>
                        <div class="content">
                            <h3>Plot :</h3>
                            <p>${data.Plot}</p>
                            <h3>Cast :</h3>
                            <p>${data.Actors}</p>
                        </div>
                    </div>
                    <img src=${data.Poster} class="poster">
                </div>
            `;
        }
        //Si le film n'existe pas dans la BDD
        else {
          result.innerHTML = `<h3 class="msg">Le film n'existe pas dans la BDD</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Une erreur c'est produite durant la requete</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);

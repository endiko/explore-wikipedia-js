function getResults(searchRequest) {
    const num = 7; // number of articles to show in result
    const req = `https://en.wikipedia.org/w/api.php?action=query&list=search&inprop=url&utf8=&format=json&origin=*&srlimit=${num}&srsearch=${searchRequest}`;

    fetch(req)
        .then(response => response.json())
        .then(data => {
          const noresult = document.querySelector('.no-results');
      
            if(!data.query.search.length) {
              noresult.innerHTML = `Nothing found in results: "${searchRequest}".`;
              noresult.style.display = 'flex';
            } else {
              showResults(data.query.search);
            }
        })
        .catch((error) => console.log(`An error occured ${error.response}`));
}

function showResults(results) {
    const searchResults = document.querySelector('.result__list');
    searchResults.innerHTML = '';
    
     results.forEach(result => {
     const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
  
     searchResults.insertAdjacentHTML('beforeend',
        `<li class="result__item">
            <h3 class="result__item-title">${result.title}</h3>
            <p class="result__item-snippet">${result.snippet}</p>
            <p class="result__item-wordcount">
              Words in article: <span>${result.wordcount}</span>
            </p>
            <a href="${url}" class="result__item-link" target="_blank" rel="noopener">Go to read the article</a>
        </li>`
      );
    });
  }

const form = document.querySelector('.search-form');
form.addEventListener('submit', function(event){
    const input = document.querySelector('.search-form__input').value,
          searchStr = input.trim();
    
    event.preventDefault();
    getResults(searchStr);
});


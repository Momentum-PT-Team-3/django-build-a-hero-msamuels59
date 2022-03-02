console.log('js loaded')
// show that the js is connected

// from Django Docs 
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// build list on homepage

let heroList = document.querySelector('#hero_list');
let heroURL = 'api/heroes'

fetch(heroURL, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'X-Reequest-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
    },
})
    .then(response => {
        return response.json()
    })
    .then(heroArray => {
        console.log(heroArray)
        for (let hero of heroArray) {
            let newHero = document.createElement('ol')
            newHero.innerText = ` Name: ${hero.name} | Alias: ${hero.alias}`
            heroList.appendChild(newHero)
        }
    })
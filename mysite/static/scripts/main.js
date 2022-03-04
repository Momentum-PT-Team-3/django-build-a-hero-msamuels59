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

var heroList = document.querySelector('#hero_list');
let heroURL = 'api/heroes/'

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
            let newHero = document.createElement('ol');
            newHero.setAttribute('onclick', 'alert("success");');
            newHero.innerText = ` Name: ${hero.name} | Alias: ${hero.alias}`;
            heroList.appendChild(newHero);
            let btn = document.createElement('button');
            btn.innerHTML = "Delete";
            btn.onclick = function () {
                removeHero(`${hero.id}`)
            }
            heroList.appendChild(btn);

        }
    })

// add a new hero

var heroForm = document.querySelector('#add_hero')

document.addEventListener('submit', function (event) {

    formData = new FormData(heroForm)
    fetch(heroURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Reequest-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
})


// delete hero 
function removeHero(id){
    fetch(heroURL+id, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Reequest-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        },
    })
    .then(() => {
        console.log('removed');
    })
    .catch(err => {
        console.error(err);
    })
    .then(window.location.reload())
}

// click hero

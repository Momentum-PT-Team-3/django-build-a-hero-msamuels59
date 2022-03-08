console.log('js loaded')
// show that the js is connected
// modal stuff


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
            let newHero = document.createElement('a');
            newHero.setAttribute('href', heroURL+`${hero.id}`);
            newHero.classList.add('f4');
            newHero.classList.add('ph3');
            // newHero.classList.add('pv');
            newHero.classList.add('pa1');
            newHero.classList.add('no-underline');
            newHero.classList.add('bg-animate');
            newHero.classList.add('hover-bg-light-blue');
            newHero.classList.add('black');
            newHero.classList.add('ba');
            newHero.classList.add('bg-transparent');
            newHero.classList.add('bg-transparent');
            newHero.classList.add('bg-transparent');
            newHero.innerText = `Name: ${hero.name} | Alias: ${hero.alias}`;
            heroList.appendChild(newHero);
            let btn = document.createElement('button');
            // btn.classList.add('b');
            btn.classList.add('ph2');
            btn.classList.add('pv2');
            btn.classList.add('ba');
            btn.classList.add('f6');
            btn.classList.add('bg-transparent');
            btn.innerHTML = "Delete";
            btn.onclick = function () {
                removeHero(`${hero.id}`)
            }
            heroList.appendChild(btn);
            let brk = document.createElement('br');
            heroList.appendChild(brk);
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


// Modal for form 
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });
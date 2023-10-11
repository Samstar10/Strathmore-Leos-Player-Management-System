//So basically this is a web application that allows the strathmore leos management to keep track of their player details and manage their details.

//Add a DOMContentLoaded event to the entire page
//Fetch data from db.json to display player cards
//Add click event to the Register New Player Button
//Fetch data from db.json to allow POST events for registering new players
//Add submit event to the registration form to allow registration of players
//Add a click event to the player cards to allow pop up modal to display player details
//Add Delete button to the player card pop up modal
//Add a click event to the delete button that fetches data and implements the DELETE method to the db.json

document.addEventListener('DOMContentLoaded', () => {
    const playersSection = document.querySelector('.container')
    const registrationButton = document.querySelector('.registrationBtn')
    const modal = document.querySelector('#registration-modal')
    const submitButton = document.querySelector('#submit-button')
    const registrationForm = document.querySelector('.registration-form')

    //Fetch data to display player cards
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => {
        data.forEach((player) => {
            const playerCard = document.createElement('div')
            playerCard.classList.add('playerCard')
            playerCard.innerHTML = `
                <img src="${player.image}" alt="${player.name}">
                <h4> ${player.name} </h4>
                <p> Position played: ${player.position} </p>
                <p> Height: ${player.height} </p>
                <p> Weight: ${player.weight} </p>
                <p> Age: ${player.age} </p>
            `
            playersSection.appendChild(playerCard)
        })
    })
    .catch(error => {
        console.log(error.message)
    })

    //Add event listener to registration button to display pop up modal
    registrationButton.addEventListener('click', () => {
        modal.classList.add('open-popup')
    })

    //Add a submit event listener and a POST request to our API
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const image = document.querySelector('#image').value;
        const height = document.querySelector('#height').value;
        const weight = document.querySelector('#weight').value;
        const age = document.querySelector('#age').value;
        const position = document.querySelector('#position-played').value;

        fetch('http://localhost:3000/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name,
                image,
                height,
                weight,
                age,
                position
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                return fetch('http://localhost:3000/players');
            }
        })
        .catch(error => {
            console.log(error.message);
        });
    });

})
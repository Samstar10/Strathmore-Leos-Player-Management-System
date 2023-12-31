document.addEventListener('DOMContentLoaded', () => {
    const playersSection = document.querySelector('.container')
    const registrationButton = document.querySelector('.registrationBtn')
    const modal = document.querySelector('#registration-modal')
    const submitButton = document.querySelector('#submit-button')
    const registrationForm = document.querySelector('.registration-form')
    //const playerCardDiv = document.querySelector('.playerCard')
    const playerCardModal = document.querySelector('#player-modal')
    let deleteButtons = document.querySelectorAll('.delete-button')
    const okButton = document.querySelector('.okay-button')
    const deleteModal = document.querySelector('#delete-modal')
    let playerIdToDelete
    const body = document.querySelector('body')
    const closeButton = document.querySelector('.close-button')

    //Fetch data to display player cards
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => {
        data.forEach((player) => {
            const playerCard = document.createElement('div')
            playerCard.classList.add('playerCard')
            playerCard.dataset.id = player.id
            playerCard.innerHTML = `
                <img src="${player.image}" alt="${player.name}">
                <h4> ${player.name} </h4>
                <p> Position played: ${player.position} </p>
                <p> Height: ${player.height} </p>
                <p> Weight: ${player.weight} </p>
                <p class="p-age"> Age: ${player.age} </p>
                <button class="delete-button"> Remove Player </button>
            `
            //Add event listener to delete button to show warning pop up modal
            const deleteButton = playerCard.querySelector('.delete-button')
            deleteButton.addEventListener('click', (e) => {
                playerIdToDelete = player.id
                deleteModal.classList.add('show-warning')
            })

            playersSection.appendChild(playerCard)
        })

        //Add event listener to trigger the delete request
        okButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/players/${playerIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log('Player deleted:', data)

                const playerCard = document.querySelector(`[data-id="${playerIdToDelete}"]`)
                if(playerCard){
                    playerCard.remove()
                }

                deleteModal.classList.remove('show-warning')
            })
            .catch(error => {
                console.log(error.message)
            })
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
        const imageFile = document.querySelector('#image').files[0];
        const height = document.querySelector('#height').value;
        const weight = document.querySelector('#weight').value;
        const age = document.querySelector('#age').value;
        const position = document.querySelector('#position-played').value;

        const reader = new FileReader()

        //Handle file uploads to read the selected image files
        reader.onload = (e) => {
            const imageBase64 = e.target.result

            const formData = {
                name,
                height,
                weight,
                age,
                position,
                image: imageBase64
            }
            fetch('http://localhost:3000/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(formData)
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
        }

        reader.readAsDataURL(imageFile)
    });

    //Add event listener to close registration pop up modal
    playersSection.addEventListener('click', () => {
        modal.classList.remove('open-popup')
    })

    //Add event listener to close warning modal button
    closeButton.addEventListener('click', () => {
        deleteModal.classList.remove('show-warning')
    })
})
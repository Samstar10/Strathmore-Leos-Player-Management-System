# Strathmore Leos Player Management System
#### Author: Samuel Muli

The Strathmore Leos Player Management System is a web application designed to help manage player information for the Strathmore Leos rugby team. It allows the management team to register new players, view player details and also remove players from the system.

## Getting Started
### Installation

Clone this repository to your local machine. 
`https://github.com/Samstar10/Strathmore-Leos-Player-Management-System.git`

Navigate to the project directory
`cd Strathmore-Leos-Player-Management-System`

Open `index.html` in a web browser to use the app

## Using JSON Server to Mimic a Backend Database

To start up JSON Server, run `json-server --watch db.json` in your terminal.
**Note**: Running this command will instruct `json-server` to use a `db.json`
file in your terminal's current directory, so make sure to run this command from
the same directory as this repository.

Once the server is running, you'll see a list of available resource paths in the
terminal.

## Usage
Open `index.html` in your web browser to start using the web application.
Click on the "Register New Player" button to add a new player.
Fill in the player details including name, height, weight, age, position and upload an image.
Click the "Submit" button to register the player.
View the list of registered players on the main page.
To remove a player, click the "Remove Player" button on their card.

## Features
1. Register new players with their details including name, height, weight, age, position, and an image.
2. View a list of registered players with their basic information and profile picture.
3. Remove players from the system.

## Contributing
If you'd like to contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch for your feature:
    `git checkout -b feature-newfeature`
3. Make changes and commit them:
    `git commit -m 'Add new feature'`
4. Push to the branch:
    `git push origin feature-newfeature`
5. Create a pull request

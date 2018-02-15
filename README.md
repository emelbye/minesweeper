# Minseweeper

## DEMO

https://minesweeper-63ffa.firebaseapp.com

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.
- With this app you can track things to do monthly and it's connected to a realtime database.

![alt text](https://image.ibb.co/gAL66S/Untitled.png)

## Setup

- Clone: `git clone https://github.com/emelbye/minesweeper.git`
- Run `npm install` to install dependencies
- Then you must create your firebase application (https://console.firebase.google.com)

## Setup Firebase
- Run `npm install -g firebase-tools`
- Login to firebase: `firebase login`
- Init firebase configuration: `firebase init`

### Init configuration
* Are you ready to proceed? Yes
* Which Firebase CLI features? Hosting (In the future, use whatever you need! Press space to select.)
* Select a default Firebase project? 'Your Project' (Choose whatever app you created in the earlier steps)
* What do you want to use as your public directory? dist (This is important! Angular creates the dist folder.)
* Configure as a single-page app? Yes

- Go to 'firebase console/Project Configuration/Add firebase to your web app' copy the config var and replace in your enviroments files (scr/enviroments).
- In 'fire base console/Authentication' choose the google authentication method and activate it.

## Development server

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build --build-optimizer=false` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy

- Run `firebase deploy`
- Open your web app (https://yourapp.firebaseapp.com)

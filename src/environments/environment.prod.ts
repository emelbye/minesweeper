export const environment = {
  production: true,
  board : {
    beginner :{
      width: 8,
      height: 8,
      mines: 10
    },
    intermediate :{
      width: 16,
      height: 16,
      mines: 40
    },
    advanced :{
      width: 22,
      height: 22,
      mines: 99
    },
    extreme : {
      width: 28,
      height: 28,
      mines: 196
    },
    insane : {
      width: 35,
      height: 35,
      mines: 365
    }
  },
  firebase : {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
};
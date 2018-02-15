// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
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

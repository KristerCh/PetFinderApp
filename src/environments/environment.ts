// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlApp: "https://localhost:44393/api/",

  defaultAvatar: "assets/faces/UserFace.png",
  petsAvatar: "assets/imgPets/petsImg.png",

  firebaseConfig: {
    apiKey: "AIzaSyAwS4MVq_6gGhVSMjty9ZyjwEphP0GGRm4",
    authDomain: "pet-finder-fd96d.firebaseapp.com",
    projectId: "pet-finder-fd96d",
    storageBucket: "pet-finder-fd96d.appspot.com",
    messagingSenderId: "27092908826",
    appId: "1:27092908826:web:f202d00e301b279f97caa3"
  }
};

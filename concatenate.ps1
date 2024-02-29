cat dist/*.js  | sc elements/elements.js

copy-item elements/elements.js -Destination ./AngularJS/elements/elements.js -Force

copy-item dist/styles.css -Destination ./AngularJS/styles/angular-elements.css -Force


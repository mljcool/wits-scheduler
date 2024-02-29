const fs = require("fs-extra");
const concat = require("concat");

(async () => {
  try {
    const files = [
      "./dist/runtime.js",
      "./dist/polyfills.js",
      "./dist/main.js",
    ];
    const exist = fs.existsSync("elements");
    if (exist) {
      fs.removeSync("elements");
    }
    await fs.ensureDir("elements");
    await concat(
      files,
      "../../AngularJS/elements/elements.js"
    );
//     C:\Users\mark.gocela\Desktop\API\AngularJS
    await concat(files, "elements/elements.js");
    await fs.copyFile(
      "./dist/styles.css",
      "../../AngularJS/elements/elements.css"
    );
  } catch (error) {
    console.error(error);
  }
})();

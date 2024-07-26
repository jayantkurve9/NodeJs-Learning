const path = require('path');

// process.mainModule.filename --> returns the path of the file name which is the root file of application.
// path.dirname --> returns the directory name of the specified fileURLToPath.
module.exports = path.dirname(require.main.filename);
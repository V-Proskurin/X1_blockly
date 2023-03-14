const fs = require('fs');
const archiver = require('archiver');
const path = require("path");

const dirname = path.basename(path.resolve(process.cwd()));
const output = fs.createWriteStream(`${__dirname}/../${dirname}.zip`);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

archive.glob(`${dirname}/**`, { ignore: `${dirname}/node_modules/**`, cwd: '../'});

archive.finalize();
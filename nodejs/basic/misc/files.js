const fs = require('fs');
const PDFDocument = require('pdfkit');

// set enctype="multipart/form-data" to form-post
// use multer to extract incoming files

exports.addfile = (request, response, next) => {};

// to download with the right filename - attachment
// to view in browser - inline
exports.sendFile = (request, response, next) => {
  fs.readFile('path', (error, data) => {
    if (error) return next(error);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="' + name + '"'
    );
  });
};

// streaming data
// response is a writable stram
// readable streames can be piped to writable streams
exports.streamFile = (request, response, next) => {
  const file = fs.createReadStream('path');
  response.setHeader('Content-Type', 'application/pdf');
  response.setHeader(
    'Content-Disposition',
    'attachment; filename="' + name + '"'
  );
  file.pipe(response);
};

// pdfDoc is readable stream
exports.pdf = (request, response, next) => {
  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream('path'));
  pdfDoc.pipe(response);
  pdfDoc.text('hello there');
  pdfDoc.end();
};

// delete file
fs.unlink('path', (error) => {
  console.log(error);
});

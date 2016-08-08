SpreadSheet = function (boardTitle) {

  this.file = {
    worksheets: [[]], // worksheets has one empty worksheet (array)
    creator: 'TrelloExport',
    created: new Date(),
    lastModifiedBy: 'TrelloExport',
    modified: new Date(),
    activeWorksheet: 0
  };

  this.addRow = function (rowData) {
    worksheet.data.push(rowData);
  };

  this.addHeader = function (header) {
    worksheet.data[0] = header;
  };

  this.export = function () {
    // We want just the base64 part of the output of xlsx.js
    // since we are not leveraging they standard transfer process.
    var byteString = window.atob(xlsx(this.file).base64);
    var buffer     = new ArrayBuffer(byteString.length);
    var ia         = new Uint8Array(buffer);

    // write the bytes of the string to an ArrayBuffer
    for (var i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    // create blob and save it using FileSaver.js
    var blob = new Blob([ia], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, boardTitle + '.xlsx');
  }

  var worksheet  = this.file.worksheets[0];
  worksheet.name = boardTitle.substring(0, 22);  // Over 22 chars causes Excel error, don't know why
  worksheet.data = [];
  worksheet.data.push([]);
};

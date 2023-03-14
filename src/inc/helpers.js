export function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
};

export function getFileContent(fileinput) {
    return new Promise((resolve, reject) => {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.error('The File APIs are not fully supported in this browser.');
            reject();
            return;
        }

        if (!fileinput || !fileinput.files || !fileinput.files[0]) {
            resolve(null);
        } else {
            var file = fileinput.files[0];
            var fileReader = new FileReader();

            fileReader.onload = function () {
                resolve(fileReader.result);
            };

            fileReader.readAsText(file);
        }
    });
}
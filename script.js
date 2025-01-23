const fileInput = document.querySelector("input");

const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();//Se evita el comportamiento predeterminado del botón
    downloadBtn.innerText = "Descargando archivo...";
    fetchFile(fileInput.value);
});


/*Se usa fetch para obtener el recurso de la URL, se combierte a blob, que es un archivo binario y se crea una URL temporal para este archivo, a su vez se crea un elemento <a> el cual sera temporal y se usara para descargar el archivo*/
function fetchFile(url) {
    fetch(url)
        .then(res => res.blob())
        .then(file => {
            let tempUrl = URL.createObjectURL(file);
            const aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.download = url.replace(/^.*[\\\/]/, '');
            document.body.appendChild(aTag);
            aTag.click();
            downloadBtn.innerText = "Descargar";
            URL.revokeObjectURL(tempUrl);
            aTag.remove();
        })
        .catch(() => {
            alert("Error al descargar archivo");
            downloadBtn.innerText = "Descargar";
        });
}

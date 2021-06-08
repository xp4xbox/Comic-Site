let MAX_COMICS = 0;

function redirect(comicNumber) {
    let url = decodeURIComponent(window.location.href).split("/").slice(0, 4);
    url.push(comicNumber.toString());
    window.location = url.join("/");
}

function render() {
    let container = document.getElementById("containerBtns");

    let currentComic = parseInt(decodeURIComponent(window.location.href).split("/")[4]);

    if (currentComic > 1) {
        let btn = document.createElement("button");
        btn.innerHTML = "Previous";
        btn.name = "btnPrev";
        btn.className = "button";
        btn.addEventListener("click", function(){redirect(currentComic - 1)});
        container.appendChild(btn);
    }

    if (currentComic < MAX_COMICS) {
        let btn = document.createElement("button");
        btn.innerHTML = "Next";
        btn.name = "btnNext";
        btn.className = "button";
        btn.addEventListener("click", function(){redirect(currentComic + 1)});
        container.appendChild(btn);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "Random Comic";
    btn.name = "btnRandom";
    btn.className = "buttonRandom";
    btn.addEventListener("click", function(){redirect(Math.round(Math.random() * (MAX_COMICS - 1) + 1))});
    container.appendChild(btn);
}

window.onload = function () {
    let xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = () => {
        if (xHttp.status === 200 && xHttp.readyState === 4) {
            MAX_COMICS = parseInt(xHttp.responseText);
            render();
        }
    }

    xHttp.open("GET", "/comic?comicCount=true");
    xHttp.send();
}
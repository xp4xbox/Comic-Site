function redirect(comicNumber) {
    let url = decodeURIComponent(window.location.href).split("/").slice(0, 4);
    url.push(comicNumber.toString());
    window.location = url.join("/");
}

// function to render buttons to display next/prev comic and a random comic
function render(maxComics) {
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

    if (currentComic < maxComics) {
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
    btn.addEventListener("click", function(){redirect(Math.round(Math.random() * (maxComics- 1) + 1))});
    container.appendChild(btn);
}

window.onload = function () {
    let xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = () => {
        if (xHttp.status === 200 && xHttp.readyState === 4) {
            render(parseInt(xHttp.responseText));
        }
    }

    xHttp.open("GET", "/comic?comicCount=true");
    xHttp.send();
}
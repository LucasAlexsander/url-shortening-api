const input = document.querySelector("#link");
const btn = document.querySelector("#submitBtn");
const encodedParams = new URLSearchParams();
const linkArea = document.querySelector("#linkArea");
const menu = document.querySelector('#menu');

const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "01145fe991mshc6f5d8da8d1c2c4p1412cajsnf873407a3c05",
    "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
  },
  body: encodedParams,
};

let getUrls = localStorage.getItem("urlShort");

linkArea.innerHTML = !getUrls ? "" : getUrls;

let btnsCopy = document.querySelectorAll(".btnCopy");

btnsCopy.forEach((btn) => {
  let button = btn.children[1].children[1];

  if (button.className == "copied") {
    button.classList.remove("copied");
    button.innerHTML = "Copy";
  }
});

const handleBtn = (e) => {
  e.preventDefault();

  // Verificando se esta vazio o input
  if (!input.value) {
    input.classList.add("empty");
    return console.log("Vazio");
  }

  input.classList.remove("empty");

  encodedParams.append("url", input.value);

  fetch("https://url-shortener-service.p.rapidapi.com/shorten", options)
    .then((response) => response.json())
    .then((response) => {
      let shortUrl = response.result_url;

      const box = document.createElement("div");
      box.classList.add("btnCopy");
      box.classList.add("box");

      const left = document.createElement("div");
      left.classList.add("left");

      const pLeft = document.createElement("p");
      pLeft.innerHTML = input.value;

      left.appendChild(pLeft);
      box.appendChild(left);

      const right = document.createElement("div");
      right.classList.add("right");

      const pRight = document.createElement("p");
      pRight.innerHTML = shortUrl;

      const btnRight = document.createElement("button");
      btnRight.innerHTML = "Copy";

      right.appendChild(pRight);
      right.appendChild(btnRight);

      box.appendChild(right);

      linkArea.appendChild(box);

      localStorage.setItem("urlShort", linkArea.innerHTML);

      btnsCopy = document.querySelectorAll("#btnCopy");

      btnsCopy.forEach((btn) => {
        btn.addEventListener("click", handleCopy);
      });

      input.value = "";
    })
    .catch((err) => console.error(err));
};

btn.addEventListener("click", handleBtn);

async function handleCopy(e) {
  let copy = e.srcElement.offsetParent.children[1].children[0].innerHTML;

  await navigator.clipboard.writeText(copy);

  btnsCopy.forEach((btn) => {
    let button = btn.children[1].children[1];
    if (button.className == "copied") {
      console.log(button);
      button.innerHTML = "Copy";
      button.classList.remove("copied");
    }
  });

  if (e.srcElement.localName == "button") {
    e.target.classList.add("copied");
    e.target.innerHTML = "Copied!";

    setTimeout(() => {
      e.target.innerHTML = "Copy";
      e.target.classList.remove("copied");
    }, 2000);
  }
}

btnsCopy.forEach((btn) => {
  btn.addEventListener("click", handleCopy);
});


menu.onclick = () => {
  if(!menu.className.match('open')) {
    return menu.classList.add('open')
  }
  menu.classList.remove('open')
}
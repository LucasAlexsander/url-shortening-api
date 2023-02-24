const input = document.querySelector("#link");
const btn = document.querySelector("#submitBtn");
const encodedParams = new URLSearchParams();
const linkArea = document.querySelector("#linkArea");
const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "01145fe991mshc6f5d8da8d1c2c4p1412cajsnf873407a3c05",
    "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
  },
  body: encodedParams,
};

let getUrls = localStorage.getItem('urlShort')

linkArea.innerHTML += getUrls



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

      const box = document.createElement('div')
      box.classList.add('box')

      const left = document.createElement('div')
      left.classList.add('left')

      const pLeft = document.createElement('p')
      pLeft.innerHTML = input.value

      left.appendChild(pLeft)
      box.appendChild(left)

      const right = document.createElement('div')
      right.classList.add('right')

      const pRight = document.createElement('p')
      pRight.innerHTML = shortUrl

      const btnRight = document.createElement('button')
      btnRight.innerHTML = 'Copy'

      right.appendChild(pRight)
      right.appendChild(btnRight)

      box.appendChild(right)

      linkArea.appendChild(box)

      localStorage.setItem('urlShort', linkArea.outerHTML)


      input.value = "";
    })
    .catch((err) => console.error(err));
};

btn.addEventListener("click", handleBtn);

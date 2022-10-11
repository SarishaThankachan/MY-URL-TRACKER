let myLinks = [];

const inputEl = document.getElementById("input-el");

const ulEl = document.getElementById("ul-el");

let storedLinks = JSON.parse(localStorage.getItem("myLinks"));

if (storedLinks) {
  myLinks = storedLinks;
  render(myLinks);
}

function render(links) {
  let listItems = "";
  for (let i = 0; i < links.length; i++) {
    listItems += `<li>
          <a target='_blank' href='${links[i]}'>
          ${links[i]}
          </a>
      </li>`;
    console.log(listItems);
  }
  ulEl.innerHTML = listItems;
}

document.getElementById("input-btn").addEventListener("click", () => {
  myLinks.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  render(myLinks);
});

document.getElementById("tab-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  });
});

document.getElementById("delete-btn").addEventListener("click", () => {
  myLinks = [];
  localStorage.clear();
  render(myLinks);
});

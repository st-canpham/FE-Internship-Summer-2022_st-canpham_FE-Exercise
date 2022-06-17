const dropDowns = document.querySelectorAll(".dropdown-btn");
const dropDownContainers = document.querySelectorAll(".dropdown-container");
console.log(dropDownContainers);

for (let i = 0; i < dropDowns.length; i++) {
  dropDowns[i].onclick = (e) => {
    e.target.classList.toggle("active");
    dropDownContainers[i].classList.toggle("active");
  };
}

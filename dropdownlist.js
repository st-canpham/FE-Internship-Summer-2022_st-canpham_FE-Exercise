const dropDowns = document.querySelectorAll('.dropdown-btn');

for (let i = 0; i < dropDowns.length; i++) {
  dropDowns[i].onclick = function () {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
  };
}

const tabs = document.querySelectorAll(".tab-link");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].onclick = (e) => {
    document.querySelector(".tab-link.current").classList.remove("current");
    document.querySelector(".tab-content.current").classList.remove("current");
    e.target.classList.add("current");
    document
      .getElementById(e.target.getAttribute("data-tab"))
      .classList.add("current");
  };
}

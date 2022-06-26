const tabs = document.querySelectorAll('.tab-link');
for (let i = 0; i < tabs.length; i++) {
  tabs[i].onclick = function () {
    document.querySelector('.tab-link.current').classList.remove('current');
    document.querySelector('.tab-content.current').classList.remove('current');
    this.classList.add('current');
    const tabId = document.getElementById(this.getAttribute('data-tab'));
    tabId.classList.add('current');
  };
}

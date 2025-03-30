document.addEventListener("DOMContentLoaded", () => {
  const headerNav = document.querySelector(".nav-list");
  const prijavaLink = headerNav?.querySelector("a[href='login.html']");
  const user = sessionStorage.getItem("username");

  if (user && prijavaLink) {
    // Prikaz emaila s plavom bojom
    prijavaLink.innerHTML = `<img src="./icons/logout_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="logout">odjavi <span style="color:#3399ff">${user}</span>`;
    prijavaLink.href = "#";
    prijavaLink.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.reload();
    });

    // Dodaj "Nastavni plan" ako ne postoji
    const postojiNastavniPlan = headerNav.querySelector(
      "a[href='curriculum.html']"
    );
    if (!postojiNastavniPlan) {
      const noviLi = document.createElement("li");
      noviLi.innerHTML = `<a href="curriculum.html"><img src="./icons/info.svg" alt="curriculum">Nastavni plan</a>`;
      const kontaktLink = headerNav.querySelector(".header-link-contact");
      headerNav.insertBefore(noviLi, kontaktLink?.parentElement);
    }
  }
});

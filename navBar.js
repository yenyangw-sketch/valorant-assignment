document.addEventListener("DOMContentLoaded", () => {
  fetch("navBar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load navbar");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("nav-placeholder").innerHTML = data;
    })
    .catch(error => console.error(error));
});

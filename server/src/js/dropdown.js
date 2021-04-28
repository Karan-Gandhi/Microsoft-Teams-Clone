window.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.getElementsByClassName("dropdown-wrapper");

    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        const dropdownTitle = dropdown.getElementsByClassName("dropdown-title")[0];
        const dropdownContent = dropdown.getElementsByClassName("dropdown-content")[0];
        dropdownTitle.addEventListener("click", () => {
            dropdownContent.classList.toggle("show");
        });
    }
});

window.addEventListener("click", event => {
    if (!event.target.matches(".dropdown-title") && !event.target.matches(".dropdown-title-mask")) {
        const dropdownContents = document.getElementsByClassName("dropdown-content");

        for (let i = 0; i < dropdownContents.length; i++) {
            dropdownContents[i].classList.remove("show");
        }
    }
});

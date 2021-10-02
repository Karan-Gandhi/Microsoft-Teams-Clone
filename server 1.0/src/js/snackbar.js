const snackbars = [];
const snackbarTimeMedium = 4000;

const createSnackbar = (time, name, action, callback) => {
    let snackbar = document.createElement("div");
    snackbar.className = "snackbar-wrapper";
    snackbar.innerHTML = `<div class="snackbar-surface"><div class="snackbar-text">${name}</div>`;
    if (action) snackbar.innerHTML += `<div class="snackbar-action">${action}</div>`;
    snackbar.innerHTML += "</div>";

    const removeSnackbar = () => {
        snackbar.style.opacity = 0;
        snackbars.splice(snackbars.indexOf(snackbar), 1);

        for (let i = 0; i < snackbars.length; i++) {
            const yOffset = i * 63;
            snackbars[i].style.transform = `translate(0, -${yOffset}px)`;
        }

        setTimeout(() => {
            snackbar.remove();
        }, 700);
    };

    if (action) {
        const actionButton = snackbar.getElementsByClassName("snackbar-action")[0];
        actionButton.addEventListener("click", e => {
            callback(e, snackbar, removeSnackbar);
        });
    }

    snackbar.style.opacity = 0;
    document.body.appendChild(snackbar);
    snackbars.unshift(snackbar);

    for (let i = 0; i < snackbars.length; i++) {
        const yOffset = i * 63;
        snackbars[i].style.transform = `translate(0, -${yOffset}px)`;
    }

    // animations
    setTimeout(() => {
        snackbar.style.opacity = 1;

        setTimeout(() => {
            snackbar.style.opacity = 0;

            setTimeout(() => {
                snackbar.remove();
                snackbars.splice(snackbars.indexOf(snackbar), 1);
            }, 700);
        }, time);
    }, 200);
};

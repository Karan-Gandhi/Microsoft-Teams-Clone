class PopupDialogueBox {
    constructor(title, submitCallback) {
        this.title = title;
        this.children = [];
        this.domRoot = document.createElement("div");
        this.domContent = document.createElement("div");
        this.submitCallback = submitCallback;
        this.createDialogueUI();
    }

    createDialogueUI() {
        let box = document.createElement("div");
        let head = document.createElement("div");
        let title = document.createElement("span");
        let footer = document.createElement("div");
        let cancleButton = document.createElement("button");
        let submitButton = document.createElement("button");

        this.domRoot.className = "dialogue-box-wrapper";
        this.domContent.className = "dialogue-box-content";
        box.className = "dialogue-box";
        head.className = "dialogue-box-head";
        title.className = "dialogue-box-title";
        footer.className = "dialogue-box-footer";
        cancleButton.className = "outline-button";
        submitButton.className = "contained-button";

        title.innerHTML = this.title;
        cancleButton.innerHTML = "Cancle";
        submitButton.innerHTML = "Submit";

        head.appendChild(title);
        footer.appendChild(submitButton);
        footer.appendChild(cancleButton);
        box.appendChild(head);
        box.appendChild(this.domContent);
        box.appendChild(footer);

        // console.log(box);
        setTimeout(() => this.domContent.appendChild(box), 10);

        // console.log(this.domContent);
        setTimeout(() => document.body.appendChild(this.domRoot), 100);

        document.addEventListener("click", e => {
            if (e.target.className.indexOf("dialogue") == -1) this.domRoot.remove();
        });
    }
}

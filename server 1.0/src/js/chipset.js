class Chipset {
    constructor(parent, additionalChildClassName) {
        this.parent = parent;
        this.length = 0;
        this.chipIndex = new Map();
        this.activeChips = [];
        this.activeChipNames = [];
        this.additionalChildClassName = additionalChildClassName;
    }

    addChip(name) {
        const newChip = new Chip(name, this, this.additionalChildClassName);
        this.chipIndex.set(newChip.id, length);
        this.activeChips.push(newChip);
        this.activeChipNames.push(name);
        length++;
    }

    length() {
        return this.length;
    }

    getChildren() {
        return this.activeChips;
    }

    getAllChipNames() {
        return this.activeChipNames;
    }

    removeChild(id) {
        if (this.chipIndex.has(id)) {
            this.activeChipNames.splice(this.chipIndex[id], 1);
            this.activeChips.splice(this.chipIndex[id], 1);
            this.chipIndex.delete(id);
        }
    }

    appendChild(child) {
        this.parent.appendChild(child);
    }
}

class Chip {
    constructor(name, parent, additionalClassName) {
        this.id = window.btoa(Date.now());
        this.name = name;
        this.parent = parent;
        this.domRoot = document.createElement("div");
        this.domRoot.className = "chip-wrapper";
        if (additionalClassName) this.domRoot.classList.add(additionalClassName);
        this.createUI();
    }

    createUI() {
        console.log(this.parent);
        this.domRoot.innerHTML = `<div class="chip-title dialogue-content-item">${this.name}</div>
                                  <img class="chip-close dialogue-content-item" src="images/close.png" alt="" />`;

        this.domRoot.addEventListener("click", e => {
            this.domRoot.remove();
            this.parent.removeChild(this.id);
        });
        this.parent.appendChild(this.domRoot);
    }
}

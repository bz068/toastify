const DEFAULT_OPTIONS = {
    closeDelay: 5000,
    onOpen: () => {},
    onClose: () => {},
    autoClosable: true,
    showProgress: true,
    type: 'success',
    newestOnTop: false
};

class Toast {
    #toastElement;
    #autoCloseTimeout;
    #gridBox;
    #intervalTimeout;

    constructor(options) {
        this.#toastElement = document.createElement('div');
        this.#toastElement.classList.add('toast');
        requestAnimationFrame(() => {
            this.#toastElement.classList.add('show');
        })
        this.#gridBox = createGrid(this.text);
        this.#toastElement.append(this.#gridBox);
        const container =
            document.querySelector('.toast-container') || createContainer();
        if (options?.newestOnTop === true){
            container.prepend(this.#toastElement);
        } else{
            container.append(this.#toastElement);
        }
        this.update({ ...DEFAULT_OPTIONS, ...options });
        this.onOpen();
        if (this.autoClosable) this.close(this.closeDelay);
    }

    set text(value) {
        this.#toastElement.querySelector('p').textContent = value;
    }

    set closeButton(callback) {
        this.#toastElement
            .querySelector('.closeBtn')
            .addEventListener('click', callback);
    }

    set type(_type) {
        const element = this.#toastElement.querySelector('.infoIcon');
        element.parentElement.classList.toggle(_type);
        if (_type === 'error') {
            element.setAttribute('name', 'alert-circle-outline');
        } else if (_type === 'success') {
            element.setAttribute('name', 'checkmark-circle-outline');
        } else if (_type === 'info') {
            element.setAttribute('name', 'information-circle-outline');
        } else if (_type === 'warn') {
            element.setAttribute('name', 'warning-outline');
        } else {
            element.removeAttribute('name');
        }
    }

    set theme(value){
        this.#toastElement.classList.add(value)
    }

    set showProgress(value) {
        if (value === true && this.autoClosable === true) {
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress');
            this.#gridBox.append(progressBar);
            const startingTime = new Date().getTime();
            this.#intervalTimeout = setInterval(() => {
                const currentTime = new Date().getTime();
                const timeDiff = currentTime - startingTime;
                const progressWidth = (timeDiff / this.closeDelay) * 100;
                const width = 100 - progressWidth;
                this.#toastElement
                    .querySelector('.progress')
                    .style.setProperty('--progress', `${width}%`);
            }, 10);
        }
    }

    update(options) {
        Object.entries(options).map(([key, value]) => (this[key] = value));
    }

    remove() {
        const parentNode = this.#toastElement.parentElement;
        this.#toastElement.remove();
        this.onClose();
        if (!parentNode.hasChildNodes())
            document.querySelector('.toast-container').remove();
        if (this.#intervalTimeout !== null)
            clearInterval(this.#intervalTimeout);
    }

    close(value) {
        if (value === false) return;
        this.closeDelay = value
        if (this.#autoCloseTimeout !== null)
            clearTimeout(this.#autoCloseTimeout);
        this.#autoCloseTimeout = setTimeout(() => {
            this.remove();
        }, value);
    }
}

const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('toast-container');
    document.body.appendChild(container);
    return container;
};

const createGrid = (_text) => {
    const gridBox = document.createElement('div');
    gridBox.classList.add('grid');
    const infoIcon = document.createElement('ion-icon');
    infoIcon.classList.add('infoIcon');
    const closeIcon = document.createElement('ion-icon');
    closeIcon.setAttribute('name', 'close-circle-outline');
    closeIcon.classList.add('closeBtn');
    const textP = document.createElement('p');
    textP.textContent = _text;
    gridBox.append(infoIcon);
    gridBox.append(textP);
    gridBox.append(closeIcon);
    return gridBox;
};

const toast = new Toast({
    text: 'lorem lorem lorem lorem',
    closeDelay: 10000,
    theme: 'dark',
});


const btnSuccess = document.querySelector('.success-btn');
const btnWarn = document.querySelector('.warn-btn');
const btnInfo = document.querySelector('.info-btn');
const btnError = document.querySelector('.error-btn');
btnSuccess.addEventListener('click', () => {
    new Toast({
        text: 'lorem lorem lorem lorem',
        onClose: () => console.log('close'),
        autoClosable: true,
        showProgress: true,
        closeDelay: 10000,
        type: 'success',
        newestOnTop: true
    })
})
btnWarn.addEventListener('click', () => {
    new Toast({
        text: 'warn warn warn warn',
        onClose: () => console.log('close'),
        autoClosable: true,
        showProgress: true,
        closeDelay: 10000,
        type: 'warn',
    })
})
btnInfo.addEventListener('click', () => {
    new Toast({
        text: 'info info info info',
        onClose: () => console.log('close'),
        autoClosable: true,
        showProgress: true,
        closeDelay: 10000,
        type: 'info',
    })
})
btnError.addEventListener('click', () => {
    new Toast({
        text: 'error error error error',
        onClose: () => console.log('close'),
        autoClosable: true,
        showProgress: true,
        closeDelay: 10000,
        type: 'error',
    })
})
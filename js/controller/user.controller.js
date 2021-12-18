'use strict'

function addUser() {
    const elInputValue = document.querySelector('.nickname').value
    createUser(elInputValue)
    toggleModal(false)
    renderUserName();
    updateGalleryPage(true);
    renderGallery()
    handleChevron();
}

function toggleModal(isOpen) {
    const elModal = document.querySelector('.modal-container');
    if (isOpen) {
        setTimeout(() => {
            onToggleGallery(false)
            elModal.classList.remove('hidden')
        }, 1200)

        onToggleEditor(false)

    }
    if (!isOpen) elModal.classList.add('hidden')
}


function renderStatistics() {
    const elModal = document.querySelector('.stat-container');
    const user = getDataForDisplay();

    if (!user || user.length === 0) return;
    const strHtmls = `

    <div>
    <h2> hello ${user.nickname} ${user.icon} </h2>
    <h4>Let's see your stats</h4>
    </div>
    
    <div><span class="under-line"> you clicks: </span> <span>${user.clicks}</span></div>
    <div><span class="under-line"> you saved: </span> <span>${user.savedClicks}</span></div>
    <div><span class="under-line"> you Download: </span> <span>${user.download}</span></div>
    <div> <canvas class="stat-canvas clicks" height:400px; width:400px> </canvas> </div>
    <div class="stat-canvas saved"></div>
    <div class="stat-canvas downloads"></div>


    `

    elModal.innerHTML = strHtmls

}

function renderUserName() {
    const user = getDataForDisplay();
    const elSpan = document.querySelector('.user-name-msg')
    const elSpanInnerName = elSpan.querySelector('.rdr-name');
    elSpanInnerName.innerText = user.nickname;
    elSpan.classList.remove('hidden')
}

function isUserStorage() {
    const data = loadFromStorage('userDB');
    if (!data || data === []) return false;
    else return true;
}


function onOpenStatistics() {
    renderStatistics()
    toggleModal(true)
}


function renderArcStat() {



    const data = Object.values(getStatForRender());
    const elCanvas = document.querySelector('.stat-canvas');
    const ctx = elCanvas.getContext('2d');
    console.log('data[0]:', data[0]);
    const radian = Math.PI / 180;


    ctx.beginPath();
    ctx.arc(100, 75, 50, 0 * radian, (data[0] * 360) * radian)
    ctx.stroke();

    // ctx.beginPath();
    // ctx.strokeStyle = 'red';
    // ctx.fillColor = 'yellow'
    // ctx.lineWidth = 15;
    // ctx.arc(100, 75, 50, 0 * radian, (data[0] * 360) * radian, false)
    // ctx.stroke()

}
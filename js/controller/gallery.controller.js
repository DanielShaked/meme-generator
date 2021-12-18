'use strict'


function renderGallery() {
    const imgs = getImgsToDisplay();
    if (!imgs) renderPopup('notSaved');
    updateLastPage(imgs.length);
    const elContainer = document.querySelector('.gallery-container');
    const strHTMLs = imgs.map(img => `
      <img onclick="onImgSelect(${img.id})" src="${img.src}">
    `)
    elContainer.innerHTML = strHTMLs.join('');
    elContainer.classList.remove('hidden');
}

function onImgSelect(imgId) {
    setImg(imgId);
    onResetMeme();
    document.querySelector('.input-txt').value = getMemeTxt();
    onToggleEditor(true);
    onToggleGallery(false);
    updateGalleryPage(false);
    handleChevron();
    renderMeme();

}


function onSetFilter(filterBy) {
    setFilter(filterBy);
    onToggleEditor(false);
    renderGallery();
}


function onHandlePages(diff) {
    setPageIdx(diff);
    const currPageLength = getCurrPageLength();
    const lastPageLength = getLastPageLength();
    toggleChevronDisplay('right', true);
    if (lastPageLength > currPageLength) {
        toggleChevronDisplay('left', false);
    } else {
        toggleChevronDisplay('left', true);
    }
    handleChevron();
    renderGallery();
}





function onToggleGallery(isOpen) {
    let elGalleryCls = document.querySelector('.gallery-container').classList;
    if (isOpen) {
        elGalleryCls.remove('hidden');
        updateGalleryPage(isOpen);
    }
    else {
        elGalleryCls.add('hidden');
        updateGalleryPage(false);
    }
    handleChevron()
}



function toggleChevronDisplay(dir, isDisplay, isBoth) {

    document.querySelector(`.fas.fa-chevron-${dir}`).style.display
        = (isDisplay) ? 'block' : 'none'

}



function onFilterBy(value) {
    setFilter(value);
    renderGallery();
    updateGalleryPage(true);
    onToggleEditor(false);
    setTimeout(() => document.querySelector('.input-dl').value = '', 2000);
}


function onHomePage() {
    onFilterBy('ALL');
    updatePageIdx(0);
    handleChevron();
    renderGallery();
    onToggleEditor(false);
    onToggleGallery(true);


}

function handleChevron() {
    if (!gOnGalleryPage) {
        toggleChevronDisplay('right', false);
        toggleChevronDisplay('left', false);
    }
    const currPage = getPageIdx();
    const isGallery = isOnGalleryPage();
    if (gOnGalleryPage && currPage === 0) {
        toggleChevronDisplay('right', false);
        toggleChevronDisplay('left', true);
    }
}


function renderPopup(key) {
    const popups = getPopUps();
    console.log('popups:', popups);

    const elPopup = document.querySelector('.popup');
    elPopup.innerText = popups[key];
    elPopup.classList.remove('hidden')
    setTimeout(() => elPopup.classList.add('hidden'), 3000)

}













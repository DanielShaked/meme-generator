'use strict'
let gFilterBy = 'ALL';
let gNextId = 101;
const gImgs = createImgs(35);
let savedImgs;
const PAGE_SIZE = 12;
var gPageIdx = 0;



function getImgsToDisplay() {
    var startIdx = gPageIdx * PAGE_SIZE
    if (savedMemes) savedImgs = savedMemes.map(meme => meme.selectedImgId);
    if (gFilterBy === 'ALL') {
        var imgs = gImgs.slice(startIdx, startIdx + PAGE_SIZE);
    }
    if (gFilterBy === 'USER' && savedMemes) {
        var imgs = gImgs.filter(img => savedImgs.includes(img.id));
    }
    return imgs;
}



function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function createImgs(number) {
    const imgs = [];
    for (let i = 1; i < number; i++) {
        imgs.push({ id: gNextId++, src: `img/meme-sq/${i}.jpg`, keyWords: [] });
    }
    return imgs;
}
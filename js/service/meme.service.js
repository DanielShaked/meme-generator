'use strict'

const STORAGE_KEY = 'memeDB'

function getImgsToDisplay() {
    return gImgs;
}

const gMemeDef = {
    selectedImgId: 101,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        coordsTxt: { x: 400 / 10, y: 400 / 10 },
        size: 40,
        align: 'left',
        color: 'red'
    },
    {
        txt: '',
        coordsTxt: { x: 400 / 10, y: 400 / 2 },
        size: 40,
        align: 'left',
        color: 'red'
    },
    {
        txt: '',
        size: 40,
        coordsTxt: { x: 400 / 10, y: 300 },
        align: 'left',
        color: 'red'
    }
    ]
}

let gMeme = { ...gMemeDef }




function getMeme() {
    const meme = gMeme;
    const img = gImgs.find(img => img.id === gMeme.selectedImgId);
    return {
        src: img.src,
        imgId: meme.selectedLineIdx,
        lineIdx: meme.selectedLineIdx,
        lines: meme.lines,
    }
}


// buttons actions

function changeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}


function setImg(imgId) {
    if (savedMemes) {
        console.log('check1');
        var bla = savedMemes.find(meme => meme.selectedImgId === imgId)
    }
    if (bla) {
        console.log('check2');

        gMeme = bla;
    } else {
        console.log('check3');
        gMeme = { ...gMemeDef }
        gMeme.selectedImgId = imgId;
    }
}



// buttons Actions

function setSize(diff) {
    gMeme.lines[0].size += diff;
}

function setColor(color) {
    gMeme.lines[0].color = color;
}

function moveLine(diff) {
    if ((diff < 0 && gMeme.selectedLineIdx === 0) || (diff > 0 && gMeme.selectedLineIdx === 2)) return;
    gMeme.selectedLineIdx += diff;
}

function resetTxt() {
    if (savedMemes) {
        savedImgs = savedMemes.map(meme => meme.selectedImgId);
        if (savedImgs.includes(gMeme.selectedImgId)) return;
    }
    console.log('imclening');
    gMeme.lines.forEach(line => {
        line.txt = ''
        line.size = 20;
        line.color = 'white'
    })
}


function saveMeme() {
    const imgIdx = gMeme.selectedImgId;
    console.log('imgIdx:', imgIdx);
    const img = gImgs.find(img => img.id === imgIdx);
    img.keyWords.push('USER')
    SaveDataToLocalStorage(gMeme);
    savedMemes = loadFromStorage('memeDB');
}


function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme);
}



'use strict'
var gCanvas;
var gCtx;
let savedMemes;

function init() {
    handleUserModal();
    savedMemes = loadFromStorage('memeDB');
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery();
}




function handleUserModal() {
    const x = loadFromStorage('userDB')
    // console.log('x', x);

}

function onChangeText(value) {
    // console.log('bla');
    changeText(value);
    renderMeme()
}

function renderMeme(isRect = true) {
    const meme = getMeme();
    var img = new Image();
    img.src = meme.src;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if (isRect) {
            if (meme.lineIdx === 0) drawRect(40, 40, meme);
            if (meme.lineIdx === 1) drawRect(40, 200, meme)
            if (meme.lineIdx === 2) drawRect(40, 300, meme)
        }
        drawText(meme)
    };
}



function drawText(meme) {
    meme.lines.forEach(line => {
        gCtx.font = `normal normal ${line.size}px   Impact`
        gCtx.fillStyle = 'white';
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 1
        // gCtx.textAlign = "center";
        gCtx.textBaseline = 'top'
        gCtx.fillText(line.txt, line.coordsTxt.x, line.coordsTxt.y);
        gCtx.strokeText(line.txt, line.coordsTxt.x, line.coordsTxt.y);
    })
}



function drawRect(x, y, meme) {
    const memeLine = meme.lines[0];
    const width = (memeLine.size < 22) ? memeLine.size * 15 : 22 * 15;
    const height = (memeLine.size < 22) ? memeLine.size * 3 : 22 * 3;
    gCtx.beginPath();
    gCtx.lineWidth = "2";
    gCtx.strokeStyle = "black";
    gCtx.rect(x, y, width, height);
    gCtx.stroke();

}



///buttons

function onMoveLine(diff) {
    moveLine(diff);
    document.querySelector('input').value = '';
    renderMeme();
}

function onSetSize(diff) {
    setSize(diff)
    renderMeme()
}

function onChangeColor(color) {
    setColor(color);
    renderMeme();
}

function onResetMeme() {
    resetTxt();
    document.querySelector('input').value = '';
}


function onToggleEditor(isOpen) {
    const elContainerCls = document.querySelector('.editor-container').classList;
    if (isOpen) elContainerCls.remove('hidden');
    else {
        elContainerCls.add('hidden')
    }
}


function onSaveMeme() {
    saveMeme();
    renderMeme(false)
}



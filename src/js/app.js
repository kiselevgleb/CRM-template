import data from './repo.js';
import Note from './Note.js';

const table = document.querySelector('table');
const divEdit = document.getElementById('note');
const pName = document.getElementById('pName');
const inputName = document.getElementById('inputName');
const pPrise = document.getElementById('pPrise');
const inputPrise = document.getElementById('inputPrise');
const butPlus = document.getElementById('Plus');
const butSave = document.getElementById("butSave");
const butClose = document.getElementById("butClose");

function init() {
    data.push(new Note("phone", 100));
    data.push(new Note("phone2", 2000));
    data.push(new Note("phone3", 300));
}
init();
let JSON = data;

console.log(JSON[0].name);
let coin;
let coinPlus = true;

function add() {
    console.log(butClose);

    table.innerHTML = "";
    const trFirst = document.createElement('tr');
    const thN = document.createElement('th');
    const thP = document.createElement('th');
    const thA = document.createElement('th');
    thN.innerHTML = "Name";
    thP.innerHTML = "Prise";
    thA.innerHTML = "Action";
    trFirst.appendChild(thN);
    trFirst.appendChild(thP);
    trFirst.appendChild(thA);
    table.appendChild(trFirst);

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const tr = document.createElement('tr');
        tr.setAttribute("num", index);
        divEdit.setAttribute("num", index);
        table.appendChild(tr);
        const thName = document.createElement('th');
        const thPrise = document.createElement('th');
        thName.innerHTML = element.name;
        thPrise.innerHTML = element.prise;
        tr.appendChild(thName);
        tr.appendChild(thPrise);
        const thBut = document.createElement('th');
        tr.appendChild(thBut);

        const butEd = document.createElement('a');
        butEd.classList.add("butEd");

        butEd.innerHTML = "&#9998";
        butEd.setAttribute("num", index);
        thBut.appendChild(butEd);
        const butDel = document.createElement('a');
        butDel.classList.add("butDel");
        butDel.setAttribute("num", index);
        thBut.appendChild(butDel);
        edit(butEd, index);
        del(butDel);
    }
    console.log(table.offsetWidth);

}


function edit(but, index) {
    but.addEventListener('click', (e) => {
        const node = inputName.parentElement.childNodes;
        node[5].innerText = " ";
        node[11].innerText = " "; 
        if (divEdit.style.display !== 'block') {
            divEdit.style.display = 'block';
        } else if (divEdit.style.display === 'block' && coin == e.target.getAttribute("num")) {
            divEdit.style.display = 'none';
        }
        inputName.value = data[index].name;
        inputPrise.value = data[index].prise;
        coin = index;
        coinPlus = true;
    });
}


function del(but) {
    but.addEventListener('click', (e) => {
        data.splice(e.target.getAttribute("num"), 1);
        console.log(e.target.getAttribute("num"));
        add(data);
    });
}


function plus() {
    butPlus.addEventListener('click', () => {
        const node = inputName.parentElement.childNodes;
        node[5].innerText = " ";
        node[11].innerText = " "; 
        if (divEdit.style.display !== 'block') {
            divEdit.style.display = 'block';
            
        } else if (divEdit.style.display === 'block' && !coinPlus) {
            divEdit.style.display = 'none';
        }
        inputName.value = "";
        inputPrise.value = "";
        coinPlus = false;
    });
}

function close() {
    butClose.addEventListener('click', () => {
        divEdit.style.display = 'none';
    });
}

function save() {
    butSave.addEventListener('click', (e) => {
        const node = e.target.parentElement.childNodes;
        node[5].innerText = " ";
        node[11].innerText = " ";
        console.log(Number(node[9].value));
        if (!coinPlus) {
            if (node[3].value.length == 0) {
                node[5].innerText = "Name field is empty";
                node[11].innerText = " ";
            } else if (node[9].value.length == 0||Number(node[9].value)<=0||Number.isNaN(Number(node[9].value))) {
                node[11].innerText = "Prise field error";
                node[5].innerText = " ";
            } else {
                const dataNew = new Note(node[3].value,Number(node[9].value));
                data.push(dataNew);
                divEdit.style.display = 'none';
                add(data);
            }
        } else {
            if (node[3].value.length == 0) {
                node[5].innerText = "Name field is empty";
                node[11].innerText = " ";
            } else if (node[9].value.length == 0||Number(node[9].value)<=0||Number.isNaN(Number(node[9].value))) {
                node[11].innerText = "Prise field error";
                node[5].innerText = " ";
            } else {
                data[coin].name = node[3].value;
                data[coin].prise = Number(node[9].value);
                divEdit.style.display = 'none';
                add(data);
            }
        }
    });
}

add(data);
plus();
close();
save();
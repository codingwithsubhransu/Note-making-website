const noteslist = document.querySelector('#noteslist');
let colors = ["#FF748B", "#B1F0F7", "#A59D84", "#A6AEBF", "#CCD5AE", "#F6FB7A", "#FA7070", "#FFCF81", "#88AB8E", "#ADC4CE"];
let index = 0;

function createnew(){
    let title = prompt("Enter the title of the note in less words");
    if(!title){
        title = "Note";
    }
    let div= document.createElement('div');
    div.classList.add('notes');

    div.innerHTML=`<div class="notescontainer">
                <div class="noteheader">
                    <h3 class="title">Title</h3>
                    <button class="opt btn btn-warning"><i class="fa-regular fa-trash-can"></i></i></button>
                </div>
                <div class="notebody">
                    <textarea placeholder="Enter your note" style ="font-size: 20px;"></textarea>
            </div>`;
notescontainer = div.querySelector('.notescontainer');
notescontainer.style.backgroundColor = colors[index++ % colors.length];

    noteslist.appendChild(div);

    let stitle = div.querySelector('.title'); //variable created to give a title to the title.
    stitle.innerText = title;
    textarea = div.querySelector('textarea');
    let del = div.querySelector(".opt");


    textarea.addEventListener("input", () => {
        savetoLocalStorage();
    });


    del.addEventListener("click", () => {
        div.remove();
        savetoLocalStorage();
    });
}

const savetoLocalStorage = () => {
    const notes = [];
    document.querySelectorAll('.notes').forEach(note => {
        const title = note.querySelector('.title').innerText;
        const text = note.querySelector('textarea').value;

        notes.push({ title, text });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadfromLocalStorage(){
    index = 0;
    const savednotes = JSON.parse(localStorage.getItem("notes")) || [];
    savednotes.forEach(note => {
    let div= document.createElement('div');
    div.classList.add('notes');

    div.innerHTML=`<div class="notescontainer">
                <div class="noteheader">
                    <h3 class="title">Title</h3>
                    <button class="opt btn btn-warning"><i class="fa-regular fa-trash-can"></i></i></button>
                </div>
                <div class="notebody">
                    <textarea placeholder="Enter your note" style ="font-size: 20px;"></textarea>
            </div>`;
notescontainer = div.querySelector('.notescontainer');
notescontainer.style.backgroundColor = colors[index++ % colors.length];

    noteslist.appendChild(div);

    let stitle = div.querySelector('.title'); //variable created to give a title to the title.
    stitle.innerText = note.title;
    textarea = div.querySelector('textarea');
    textarea.innerText = note.text;
    let del = div.querySelector(".opt");


    textarea.addEventListener("input", () => {
        savetoLocalStorage();
    });


    del.addEventListener("click", () => {
        div.remove();
        savetoLocalStorage();
    });

    });
}

window.addEventListener('load', loadfromLocalStorage);
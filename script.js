const addBook = document.querySelector('#addBook');
const dialog = document.querySelector('dialog');
const cancel = document.querySelector('#cancel');
const conf = document.querySelector('#confirm');
const form = document.querySelector('form');
const libraryDisplay = document.querySelector('#lib');

addBook.addEventListener('click',()=>{
    console.log('hi');
    dialog.showModal();
})

cancel.addEventListener('click',(e)=>{
    e.preventDefault();
    dialog.close();
})

function bookConstructor(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

bookConstructor.prototype.toggleRead = function(){
    this.read=!this.read;    
}

let myLib = []


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const book = new bookConstructor(
        data.get('title'),
        data.get('author'),
        data.get('pages'),
        data.get('read') === 'on'
    );
    e.target.reset();
    myLib.push(book);
    console.log(myLib);
    dialog.close();
})

function display(){
    
}

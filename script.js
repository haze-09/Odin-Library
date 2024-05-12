const addBook = document.querySelector('#addBook');

const dialog = document.querySelector('dialog');

const cancel = document.querySelector('#cancel');

addBook.addEventListener('click',()=>{
    console.log('hi');
    dialog.showModal();
})

cancel.addEventListener('click',(e)=>{
    e.preventDefault();
    dialog.close();
})

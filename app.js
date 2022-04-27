//book constructor

function Book(title,author,isbn){
    this.title = title;
    this.author =author;
    this.isbn = isbn;
}


//UI constructor

function UI(){}

//Prototypes
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  const row = document.createElement('tr');

  row.innerHTML=`
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td> <a href="#" class="delete"> X </td>

  `;

  list.appendChild(row);
}

UI.prototype.deleteBook = function(target){

  if(target.className==='delete')
    target.parentElement.parentElement.remove();
    
}
UI.prototype.clearFormFields = function(){

  document.getElementById('title').value="";
  document.getElementById('author').value="";
  document.getElementById('isbn').value="";
  
}

UI.prototype.showAlert = function(message,className){

  //creating div
  const div =  document.createElement('div')
  div.className = `.alert ${className}`;


  //to append to message 
  div.appendChild(document.createTextNode(message));
  //setting the elements of div
  const container = document.querySelector('.container');
  const bookForm = document.querySelector('#book-form');

  //inserting div
  container.insertBefore(div,bookForm);

  setTimeout(function(){
    div.remove();
  },3000);
}
//Onclick EventListner

document.getElementById('book-form').addEventListener('submit',function(e){
  //get values
  const title=document.getElementById('title').value;
  const author=document.getElementById('author').value;
  const isbn=document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title,author,isbn);

  //Instantiate UI
  const ui = new UI();

  if(title=== '' || author=== '' || isbn=== ''){
    ui.showAlert('Please fill all the fields......','error');
  }else{
    //calling ui prototype
    ui.addBookToList(book);

    ui.showAlert('Book added successfully','success');

     //clearing the ui fields
    ui.clearFormFields();

  }
  
  e.preventDefault();
});

// remove booklist

document.querySelector('#book-list').addEventListener('click',function(e){
  
  const ui = new UI();
  ui.deleteBook(e.target);

  ui.showAlert('book removed','success');

  e.preventDefault();
})
class Book{
  constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }
}

class UI{ 
  addBookToList(book){
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

  deleteBook(target){
    if(target.className==='delete')
    target.parentElement.parentElement.remove();
    
  }

  showAlert(message,className){
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

  clearFormFields(){
    document.getElementById('title').value="";
    document.getElementById('author').value="";
    document.getElementById('isbn').value="";
  }
}

//storage manipulation
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books=[];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBook(){

    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI;
      ui.addBookToList(book);
    })

  }
  static addBook(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(isbn){
      
      const books = Store.getBooks();
      console.log(books);
      books.forEach(function(book,index){
        console.log(index);
        if(book.isbn === isbn){
          books = books.splice(index,0);
        }
      });
      console.log(books);

      localStorage.setItem('books',JSON.stringify(books));

  }
}
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
    // //calling ui prototype
    ui.addBookToList(book);
    Store.addBook(book);

    ui.showAlert('Book added successfully','success');

     //clearing the ui fields
    ui.clearFormFields();

  }
  
  e.preventDefault();
});

//display books
document.addEventListener('DOMContentLoaded',Store.displayBook());

// remove booklist

document.querySelector('#book-list').addEventListener('click',function(e){
  
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('book removed','success');

  e.preventDefault();
})
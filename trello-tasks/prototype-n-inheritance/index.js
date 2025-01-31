function __extends(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  Child.superclass = Parent.prototype; // optional
}

function Book({ title, author, year }) {
  this.title = title;
  this.author = author;
  this.year = year;
}

Book.prototype.getInfo = function () {
  return '"' + this.title + '" by ' + this.author;
};

function EBook({ title, author, year, fileSize }) {
  EBook.superclass.constructor.call(this, { title, author, year });
  this.fileSize = fileSize;

  this.download = function () {
    const info = EBook.superclass.getInfo.call(this);

    return info + ' (Size: ' + this.fileSize + ') will be downloaded.';
  };
}

__extends(EBook, Book);

/*

var __extends = function (Child, Parent) {
  function Fn() {
    this.constructor = Child;
  }
  Fn.prototype = Parent.prototype;
  Child.prototype = new Fn();
};

var Book = (function () {
  function Book({ title, author, year }) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
  Book.prototype.getInfo = function () {
    return '"' + this.title + '" by ' + this.author;
  };
  return Book;
})();

var EBook = (function (Book) {
  __extends(EBook, Book);
  function EBook({ title, author, year, fileSize }) {
    Book.call(this, { title, author, year });
    this.fileSize = fileSize;

    this.download = function () {
      const info = Book.prototype.getInfo.call(this);

      return info + ' (Size: ' + this.fileSize + ') will be downloaded.';
    };
  }

  return EBook;
})(Book);

*/

const book = new Book({
  title: 'A story about dwarves',
  author: 'Jack Darrel',
  year: '2021',
});

const eBook = new EBook({
  title: 'A story about elves',
  author: 'Jack Darrel',
  year: '2022',
  fileSize: 23.4,
});

console.log(book.getInfo());
console.log(eBook.getInfo());
console.log(eBook.download());
console.log(EBook.prototype.download === eBook.download);

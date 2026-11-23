"use strict";
class Book {
    title;
    author;
    year;
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    getInfo() {
        return `${this.title} - ${this.author} (${this.year})`;
    }
    isOld() {
        return this.year < 2000;
    }
}
const book1 = new Book("The C Programming Language", "Brian Kernighan", 1978);
const book2 = new Book("Python for Data Analysis", "Wes McKinney", 2012);
console.log(book1.getInfo());
console.log("Old book?", book1.isOld());
console.log(book2.getInfo());
console.log("Old book?", book2.isOld());

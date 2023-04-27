import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [
      {
        id: 1,
        title: "Networking",
        description:
          "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
        user: "John Doe",
        likes: 10,
        views: 100,
        materialType: "Book",
        date: "2021-01-01",
        department: "Computer Science",
        year: "1",
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

        comments: [
          {
            id: 1,
            comment: "Nice book",
            user: "Beteab",
          },
          {
            id: 2,
            comment: "I hate this book",
            user: "Anobie",
          },
        ],
      },
      {
        id: 2,
        title: "Networking",
        description:
          "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
        user: "John Doe",
        likes: 10,
        views: 100,
        materialType: "Book",
        date: "2021-01-01",
        department: "Computer Science",
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        picture:
          "https://images-na.ssl-images-amazon.com/images/I/51Zy9ZQZQWL._SX331_BO1,204,203,200_.jpg",
        comments: []
      },
      {
        id: 3,
        title: "Networking",
        description:
          "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
        user: "John Doe",
        likes: 10,
        views: 100,
        materialType: "Book",
        date: "2021-01-01",
        department: "Computer Science",
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        picture:
          "https://images-na.ssl-images-amazon.com/images/I/51Zy9ZQZQWL._SX331_BO1,204,203,200_.jpg",
          comments: []
      },
      {
        id: 4,
        title: "Networking",
        description:
          "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
        user: "John Doe",
        likes: 10,
        views: 100,
        materialType: "Book",
        date: "2021-01-01",
        department: "Computer Science",
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        picture:
          "https://images-na.ssl-images-amazon.com/images/I/51Zy9ZQZQWL._SX331_BO1,204,203,200_.jpg",
          comments: []
      },
      {
        id: 5,
        title: "Networking",
        description:
          "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
        user: "John Doe",
        likes: 10,
        views: 100,
        materialType: "Book",
        date: "2021-01-01",
        department: "Computer Science",
        file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        picture:
          "https://images-na.ssl-images-amazon.com/images/I/51Zy9ZQZQWL._SX331_BO1,204,203,200_.jpg",
          comments: []
      },
    ],
    filters: {
      materialType: "",
      year: "",
      department: "",
    },
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions;

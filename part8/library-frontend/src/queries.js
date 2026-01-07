import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      books
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!) {
    addBook(title: $title, published: $published, author: $author) {
      title
      published
      author
    }
  }
`;

export const EDIT_BORN = gql`
  mutation EDIT_BORN($name: String!, $born: Int!) {
    editBorn(name: $name, born: $born) {
      name
      born
      books
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!) {
    createUser(username: $username) {
      username
      id
    }
  }
`;


import React from 'react';

import NewForm from './components/NewForm';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003';
} else {
  baseUrl = 'heroku';
}
console.log('current base URL:', baseUrl);

class App extends React.Component {
  state = {
    books: [],
  }

  getBooks = () => {
    fetch(baseUrl + '/books').then(res => {
      return res.json();
    }).then(data => {
      this.setState({
        books: data,
      });
    });
  }

  addBook = (newBook) => {
    const copyBooks = [...this.state.books];
    copyBooks.push(newBook);
    this.setState({
      books: copyBooks,
    });
  }

  toggleRead = (book) => {
    fetch(baseUrl + '/books/' + book._id, {
      method: 'PUT',
      body: JSON.stringify({celebrated: !book.celebrated}),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
        const copyBooks = [...this.state.books]
        const findIndex = this.state.books.findIndex(book => book._id === resJson._id)
        copyBooks[findIndex].celebrated = resJson.read
        this.setState({books: copyBooks})
    })
  }

  addLike = (book) => {
    console.log(book)
    fetch(baseUrl + '/books/' + book._id, {
      method: 'PUT',
      body: JSON.stringify({ likes: book.likes + 1 }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
        const copyBooks = [...this.state.books]
        const findIndex = this.state.books.findIndex(book => book._id === resJson._id)
        copyBooks[findIndex].likes = resJson.likes
        this.setState({books: copyBooks})
    })
  }

  
  deleteBook = (id) => {
    console.log(id)
    fetch(baseUrl + '/books/' + id, {
      method: 'DELETE'
    }).then( response => {
      const findIndex = this.state.books.findIndex(book => book._id === id)
      const copyBooks = [...this.state.books]
      copyBooks.splice(findIndex, 1)
      this.setState({books: copyBooks})
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div>
        <h1>List of Books to read</h1>
        <NewForm baseUrl={ baseUrl } addBook={ this.addBook }/>
        <table>
          <tbody>
            {
              this.state.books.map((book, index) => {
                return (
                  <tr key={index}>
                    <td>{ book.name }</td>
                    <td onClick={()=>this.deleteBook(book._id)}>X</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;

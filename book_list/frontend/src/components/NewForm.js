import React, { Component } from 'react'

const promise1 = new Promise((resolve, rejects) => {
    throw 'Uh-oh';
})

export default class NewForm extends Component {
   
    state = {
        name: '',
    }

    handleChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(this.props.baseUrl + '/books', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            this.props.addBook(data);
            this.setState({
                title: ''
            });
        });

        promise1.catch((error => {
            console.error(error);
        }))
        
    }

    render() {
        return (
            <form onSubmit={ (evt) => this.handleSubmit(evt) }>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.name }/>
                <input type="submit" value="Add a Book to the List"/>
            </form>
        )
    }
}

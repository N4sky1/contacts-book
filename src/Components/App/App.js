import React from 'react';
import './App.scss';
import ContactList from '../ContactList/ContactList'

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <h1>Contact book</h1>
        <ContactList />
      </div>
    )
  }
}



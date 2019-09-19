import React from 'react'
import './ContactTextField.scss'
import editIcon from './img/edit.svg'

export default class ContactTextField extends React.Component {

  render() {
    const {text, name, changeField, id, inputChange, submitInput} = this.props

    return (
      <div className="text-field">
        <h3>{name}</h3>
          <form className="text-field__input-wrap" onSubmit={submitInput}>
            <input 
              className="text-field__text"
              readOnly 
              placeholder={text}
              onChange={() => inputChange(id, name)}
            />
            <button 
              style={{display:'none'}} 
              onClick={changeField}
            >
              Ok
            </button>
            <img 
              src={editIcon}
              onClick={changeField}
              alt="change icon"
            />
          </form>
        </div>
    )
  }
}


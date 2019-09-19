import React from 'react';
import './ContactList.scss';
import FetchService from '../../services/FetchService'
import ContactTextField from '../ContactTextField/ContactTextField'
import SearchPanel from '../SearchPanel/SearchPanel'

export default class ContactList extends React.Component {
  state = {
    peopleList: null,
    term: '',
    sortList: null
  }
  FetchService = new FetchService()

  checkLocalStorage = () => {
    if (localStorage.getItem('peopleList')) {
      let returnObj = JSON.parse(localStorage.getItem('peopleList'))
      this.setState({
            peopleList:returnObj
          })
    } else {
      this.FetchService
        .getAllPeople()
        .then((peopleList) => {
          let serialObj = JSON.stringify(peopleList);
          localStorage.setItem('peopleList', serialObj)

          this.setState({peopleList})
        })
    }
  }

  componentDidMount() {
   this.checkLocalStorage()
   //localStorage.clear()
  }
  
  changeField = (e) => {
    let input = e.target.parentNode.querySelector('input')
    let button = e.target.parentNode.querySelector('button')
    let parrent = e.target.parentNode
    let toggle
    if (e.target.tagName==='IMG') { toggle = true }
    if (e.target.tagName==='BUTTON') { toggle = false }

    parrent.className = toggle ? 
                        "text-field__input-wrap change" 
                        : "text-field__input-wrap"
    input.readOnly= toggle ? false : true

    toggle && (input.value = input.placeholder)
    input.placeholder = toggle ? '' : input.value
    toggle && input.focus()
    button.style.display = toggle ? 'block' : 'none'
  }

  inputId 
  inputName

  inputChange = (id, name) => {
    this.inputId = id
    this.inputName = name
  }
  submitInput = (e) =>  {
    let id = this.inputId
    let name = this.inputName
    let inputValue = e.target.parentNode.querySelector('input').value

    const idx = this.state.peopleList.findIndex((el) => el.id === id)
    const oldItem = this.state.peopleList[idx]
    const newItem = {...oldItem, [name]: inputValue}
    let newArr = [
      ...this.state.peopleList.slice(0, idx), 
      newItem,
      ...this.state.peopleList.slice(idx+1)
    ]
    this.setState({
      peopleList: newArr
    })
    let serialObj = JSON.stringify(newArr);
    localStorage.setItem('peopleList', serialObj)

    e.preventDefault()
  }

  onSearchChange = (term) => {
    this.setState({term})
  }

  filter(term, arr) {
    if (term.length === 0) {
        return arr
    }
    return arr.filter((item) => {
      return item.name
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1
    })
  }

  getSortList = () => {
    let sortArr = [].concat(this.state.peopleList)
      .sort((a, b) => {
        if( a.name < b.name ){ return -1 }
        if( a.name > b.name ){ return 1 }
        
        return 0;
        }
      )
    this.setState({
      sortList: sortArr
    })  
  }
  renderItems(arr) {
    return arr.map((people) => {
        return (
          <div className="contact-item" key={people.id}>
            <img src={people.avatar} alt="user avatar"/>
            <ContactTextField
              name={'name'} 
              id={people.id}
              text={people.name}
              changeField={this.changeField}
              inputChange={this.inputChange}
              submitInput={this.submitInput}
            />
            <ContactTextField 
              name={'username'}
              id={people.id}
              text={people.username}
              changeField={this.changeField}
              inputChange={this.inputChange}
              submitInput={this.submitInput}
            />
            <ContactTextField
              name={'website'} 
              id={people.id}
              text={people.website}
              changeField={this.changeField}
              inputChange={this.inputChange}
              submitInput={this.submitInput}
            />
          </div>
        )
    })
  }
  
  render() {
    const { peopleList, term, sortList } = this.state

    let visibleArr = sortList ? sortList : peopleList
    const visibleItems = this.filter(term, visibleArr)
    const items = peopleList && this.renderItems(visibleItems)
    return (
      <div className="contact-list">
        <SearchPanel 
          onSearchChange={this.onSearchChange}
          getSortList={this.getSortList}
        />
        {items}
      </div>
    )
  }
}



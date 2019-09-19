import React from 'react';

import './SearchPanel.scss';

export default class SearchPanel extends React.Component  {
  state = {
    term: ''
  }
  onSearchChange = (e) => {
    const term = e.target.value
    this.setState({term})
    this.props.onSearchChange(term)
  }
  render() {
    const {getSortList} =this.props
    return (
      <div className="search-panel">
        <input type="text"
          className="search-panel__input"
          placeholder="type to search" 
          value={this.state.term}
          onChange={this.onSearchChange}
        />
        <button 
          onClick={getSortList}
          className="search-panel__sort-btn"
        >
          Sort by name
        </button>
      </div>
      
    )
  }
};


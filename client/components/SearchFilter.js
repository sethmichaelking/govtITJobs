import React, { Component } from 'react'
import { connect } from 'react-redux'
class SearchFilter extends Component {
  constructor(){
    super()
    this.state = {
        search: 'search'
    }
    this.changeState = this.changeState.bind(this)
  }

  changeState(e){
    console.log(e)
  }
  render() {
    return (
      <div>
        <input type="text" class="icon" placeholder="Search" onChange={(e) => this.changeState(e.target.value)}/>
      </div>
    )
  }
}

const mapState = (state) => {
    return {

    }
}
const mapDispatch = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatch)(SearchFilter)
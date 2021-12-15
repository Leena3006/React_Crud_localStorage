import React, { Component } from 'react'
import {Routes,Route} from 'react-router-dom'
import Forms from './components/form'
import List from './components/list'



class App extends Component {
 
  render() {
    return (
      <Routes>
        <Route path='/' element={<List/>}/>
        <Route path='/form' element={<Forms/>}/>
      </Routes>
    )
  }
}

export default App
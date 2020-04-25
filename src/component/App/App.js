import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import InputList from '../InputList/InputList';
import DefaultInputList from '../InputList/DefaultInputList'


library.add(faTrash)

const inputs = [
  {id: 1,  content: 'AAABBBA'},
  {id: 2,  content: 'BBAABBA'},
  {id: 3,  content: 'ABABBBA'}
];




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedOption: "option1",
        items: [],
        currentItem: {
            text:'',
            key: ''
        }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
}

handleInput(e){
    this.setState({
        currentItem: {
            text: e.target.value,
            key: Date.now()
        }
    })
}

addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem.text !== ''){
        const newItems = [...this.state.items, newItem];
        this.setState({
            items: newItems,
            currentItem: {
                text: '',
                key: ''
            }
        })
    }
    console.log(this.state.items)
}

deleteItem(key){
  const filteredItem = this.state.items.filter(item =>
    item.key !== key);
    this.setState({
      items: filteredItem,
    })
}

handleOptionChange = changeEvent => {
  this.setState({
    selectedOption: changeEvent.target.value
  });
};

  render(){

    const inputForm = <form id="input-form" onSubmit={this.addItem}>
                      <div className="input-group mb-3">
                          <input type="text" className="form-control" placeholder="Dodaj odczyt" 
                                  aria-label="Dodaj odczyt" aria-describedby="button-addon2" 
                                  value={this.state.currentItem.text} onChange={this.handleInput}></input>
                          <div className="input-group-append">
                              <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Dodaj</button>
                          </div>
                      </div>
                  </form>

      const content = this.state.checked 
      ? <div> Content </div>
      : null;

    const defaultData = this.state.selectedOption == 'option1';
    let list;
    if(defaultData) {
      list = <DefaultInputList inputs={inputs}/>
      } else {
       list =  <div>{inputForm} <InputList items={this.state.items} deleteItem={this.deleteItem}/> </div>
      }
    return (
      <div className="App">
        <div className="container">
        <h1>Graf pokrycia OLC</h1>
        <p>Metody bioinformatyki 20L</p>

        <div className="row">
          <div className="col-lg-4">
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="gender1">
              <FormControlLabel value="option1" checked={this.state.selectedOption === "option1"} 
                                                onChange={this.handleOptionChange} control={<Radio color="primary"/>} label="Dane domyślne"/>
              <FormControlLabel value="option2" checked={this.state.selectedOption === "option2"} 
                                                onChange={this.handleOptionChange} control={<Radio color="primary"/>} label="Wprowadź swoje dane" />
            </RadioGroup>
          </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4"> 
            {list}
          </div> 

        </div>
        </div>              
      </div>
    );

  }
}

export default App;

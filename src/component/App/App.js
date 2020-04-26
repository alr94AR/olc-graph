import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import InputList from '../InputList/InputList';
import DefaultInputList from '../InputList/DefaultInputList'


library.add(faTrash)

const inputs = [
  'AAABA',
  'ABAAB',
  'BAABA',
  'AABAB'
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
    this.callFindOverlap = this.callFindOverlap.bind(this);
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

 findOverlap(a, b) {
  if (b.length === 0) {
    return "";
  }

  if (a.endsWith(b)) {
    return b;
  }

  //if (a.indexOf(b) >= 0) {
   // return b;
  //}

  return this.findOverlap(a, b.substring(0, b.length - 1));  
}

findOverlapLength(a,b) {
  return this.findOverlap(a, b).length;
}

callFindOverlap(){
  console.log("aaa");
  console.log(inputs.content);
  let i;
  let j;
  let overlapArray = new Array(inputs.length);
  console.log(overlapArray);
  
  for(i=0; i < inputs.length; i++){
    overlapArray[i] = new Array (inputs.length);
    overlapArray[i].fill(0);
    for(j=i+1; j < inputs.length; j++){
      let output = this.findOverlapLength(inputs[i], inputs[j] );
      overlapArray[i][j] = output;
      console.log(output);
    }
  }
  console.log(overlapArray);

  let index = 0;
  let orderArray = new Array(inputs.length);
  for(i=0; i< inputs.length-1; i++){
    console.log("iteracja " + i)
    let maxVal = Math.max.apply(Math, overlapArray[index]);
    console.log("max " + maxVal);
    let currentIndex = overlapArray[index].indexOf(maxVal);
    let nextMaxVal = Math.max.apply(Math, overlapArray[currentIndex]);
   
    if(!nextMaxVal && i != inputs.length-2) {
      overlapArray[index][currentIndex] = 0;
      maxVal = Math.max.apply(Math, overlapArray[index]); 
      currentIndex = overlapArray[index].indexOf(maxVal);
      console.log("Second max " + maxVal +' '+ currentIndex);
    }
    orderArray[i] = [currentIndex, maxVal];

    console.log("current " + currentIndex);
    index = currentIndex;
    console.log(inputs[index]);
    
  }

  console.log(orderArray);
}

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
              <Button variant="contained" color="primary" onClick={this.callFindOverlap}>Rozpocznij</Button>
            </div> 
          </div>
        </div>              
      </div>
    );

  }
}

export default App;

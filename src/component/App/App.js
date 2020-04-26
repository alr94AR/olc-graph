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

// Metoda zwracająca nakładający się fragment obu sekwencji.
 findOverlap(a, b) {
  if (b.length === 0) {
    return "";
  }

  if (a.endsWith(b)) {
    return b;
  }

// Opcjonalne sprawdzanie nakładanie się z lewej strony,
// ale na razie wystarczy nam sprawdzanie prawostronne.
  //if (a.indexOf(b) >= 0) {
   // return b;
  //}

  return this.findOverlap(a, b.substring(0, b.length - 1));  
}
// Metoda zwracająca długość nakładającego się fragmentu obu sekwencji.
findOverlapLength(a,b) {
  return this.findOverlap(a, b).length;
}

// Wstępny prototyp implementacji algorytmu zachłannego. 
// Z obserwacją postępu w oknie konsoli.
callFindOverlap(){
  console.log("Rozpoczynam operację wyszukiwania kontiga.");
  console.log(inputs.content);
  let i;
  let j;
  // macierz nxn przechowująca wagi krawędzi między grafami, 
  // czyli długości nakładających się fragmentów obu sekwencji.
  let overlapArray = new Array(inputs.length);
  console.log(overlapArray);
  
  // Wpierw uzupełniamy macierz nakładania się 0 i 
  // Miarą nakładania się sekwencji.
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

  // Następnie przechodzimy po macierzy sekwencji, zaczynając od rekordu,
  // Od którego wpierw zaczęliśmy tworzenie macierzy nakładania.
  // Następnie przechodzimy po kolejnych sekwencjach, które najbardziej się
  // nakładają. Wypisujemy po kolei kolejne podsekwencje. 
  let index = 0;
  let orderArray = new Array(inputs.length);
  for(i=0; i< inputs.length-1; i++){
    console.log("Iteracja " + i)
    let maxVal = Math.max.apply(Math, overlapArray[index]);
    console.log("Max nakładanie " + maxVal);
    let currentIndex = overlapArray[index].indexOf(maxVal);
    let nextMaxVal = Math.max.apply(Math, overlapArray[currentIndex]);
    // Proste sprawdzenie na wypadek skrajnego przypadku, gdyby z następnego
    // węzła nie można było przejść nigdzie dalej. 
    if(!nextMaxVal && i != inputs.length-2) {
      console.log("Obsługa ślepego zaułka");
      overlapArray[index][currentIndex] = 0;
      maxVal = Math.max.apply(Math, overlapArray[index]); 
      currentIndex = overlapArray[index].indexOf(maxVal);
      console.log("Second max " + maxVal +' '+ currentIndex);
    }
    // Dodanie kolejnego kroku oraz wartości nakładania w kroku.
    orderArray[i] = [currentIndex, maxVal];

    console.log("current " + currentIndex);
    index = currentIndex;
    // Dla celów testowych wypisanie kolejnych kroków algorytmu.
    console.log(inputs[index]);

    // TODO: utworzenie metody która na podstawie macierzy kroków
    // pełnej sekwencji. Będziemy dodawać kolejne podsekwencje (o indeksach 
    // wskazanych w orderArray), ale bez pierwszych maxVal znaków. 

    
    
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

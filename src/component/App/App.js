import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import InputList from '../InputList/InputList'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  render(){
    return (
      <div className="App">
      <h1>Graf pokrycia OLC</h1>
      <p>Metody bioinformatyki 20L</p>
      <div className="col-lg-4">
                <form id="input-form" onSubmit={this.addItem}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Dodaj odczyt" 
                                aria-label="Dodaj odczyt" aria-describedby="button-addon2" 
                                value={this.state.currentItem.text} onChange={this.handleInput}></input>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Dodaj</button>
                        </div>
                    </div>
                </form>
            </div>  
        <InputList items={this.state.items} deleteItem={this.deleteItem}/>
      </div>
    );

  }
}

export default App;

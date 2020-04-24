import React from 'react';

export default class AddElement extends React.Component {

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
    }
    
    render(){
        return (
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
        );
    }
}
import './Numbers.css';
import React from 'react';


export default class Numbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inputValue: '',
          elements: []
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem('items') !== null) {
            this.setState({
                elements: JSON.parse(localStorage.getItem('items')),
            })
        }
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value        
        })
    }

    handleOnSubmit = () => {

        if (this.state.inputValue.length !== 0) {
            const first = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
            const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
            const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
            let word = '';
            for (let i = 0; i < mad.length; i++) {
                let temp = this.state.inputValue%(100*Math.pow(1000,i));
                if (Math.floor(temp/Math.pow(1000,i)) !== 0) {
                    if (Math.floor(temp/Math.pow(1000,i)) < 20) {
                        word = first[Math.floor(temp/Math.pow(1000,i))] + mad[i] + ' ' + word;
                    } else {
                        word = tens[Math.floor(temp/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(temp/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
                    }
                }

                temp = this.state.inputValue%(Math.pow(1000,i+1));
                if (Math.floor(temp/(100*Math.pow(1000,i))) !== 0) {
                    word = first[Math.floor(temp/(100*Math.pow(1000,i)))] + 'hunderd ' + word;
                }
            }
            
            let date = new Date();

            var newObj = {
                text: word.trim(),
                time: date.getTime()
            }

            this.setState(prevState => ({
                elements: [...prevState.elements, newObj]
            }))

            setTimeout(() => {
                localStorage.setItem('items', JSON.stringify(this.state.elements));
            },1000)

            setTimeout(() => {
                document.getElementById('numberInput').value = '';
            },0)

        } else {
            let numberInput = document.getElementById('numberInput')
            numberInput.classList.add('red');
            let place = numberInput.attributes.getNamedItem('placeholder')
            place.value = 'No number was typed';
            setTimeout(() => {
                numberInput.classList.remove('red');
                place.value = 'Type a number';
            },2000)
        } 
    }

    deleteRow = (e) => {
        var array = [...this.state.elements];
        e.preventDefault();
        for (let i = 0; i < this.state.elements.length; i++) {
            if(this.state.elements[i].text === e.target.parentNode.attributes.getNamedItem('text').value) {
                array.splice(i, 1);
                this.setState({elements: array});
            }    
        }

        setTimeout(() => {
            localStorage.setItem('items', JSON.stringify(this.state.elements));
        },1000)
    }

    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    handlePaste = () => {
        document.getElementById('numberInput').value = '';
        setTimeout(() => {
            document.getElementById('numberInput').value = '';
        },0)
    }

    clearAll = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.setState({
            elements: [],
        })

        setTimeout(() => {
            document.getElementById('numberInput').value = '';
        },0)

    }

    render() {

        return (
   
        <form id="container">
            <input id="numberInput" type="number" name="number" maxLength="12" onPaste={this.handlePaste} onInput={this.maxLengthCheck} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="Type a number" autoComplete="off"/>
            <button id="submitBtn" type="button" onClick={this.handleOnSubmit}>Submit</button>
            <div id="results">

            {this.state.elements.length ?
                <div id="resultsContent">
                    <h2>Results</h2>
                    <button id="clearAllBtn" onClick={e => this.clearAll(e)}>Clear All</button>
                </div>: null
            }

            {
                this.state.elements.map((obj, index) => {
                    return (
                        <div className='row' key={index} text={obj.text} time={obj.time}>
                            <span>{obj.time}</span>
                            <span className="sentence">{obj.text}</span>
                            <button onClick={e => this.deleteRow(e)}>Delete</button>
                        </div>
                    )
                    
                })
            }

            </div>   
        </form>

        );
    }
}
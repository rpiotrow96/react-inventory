import './App.css';
import React from 'react';
import ItemsTable from './ItemsTable'
import Filters from './Filters'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxValue: null,
            minValue: null
        }
    }
    setMinValue = (childData) => {
        this.setState({minValue: childData});
    }

    setMaxValue = (childData) => {
        this.setState({maxValue: childData});
    }

    render() {
        return (
            <div className="container pt-3">
                <Filters setMinValue = {this.setMinValue} setMaxValue = {this.setMaxValue}/>
                <ItemsTable items ={this.props.items} maxValue={this.state.maxValue} minValue={this.state.minValue}/>
            </div>
        );
    }

}

export default App;

import './App.css';
import ItemsTable from './ItemsTable'
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div className="container pt-3">
                {
                    <ItemsTable items ={this.props.items}/>
                }
            </div>
        );
    }

}

export default App;

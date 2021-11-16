import './App.css';
import React from 'react';
import ItemsTable from './ItemsTable'
import Filters from './Filters'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            sortedColumn: 'id',
            direction: 'ascending',

            minValue: 0,
            maxValue: Number.POSITIVE_INFINITY
        }
    }

    setMinValue = (value) => {
        if (value === '' || value === null) {
            value = 0;
        }
        this.setState({
            minValue: value
        }, () => {
            this.refreshItems();
        });
    }

    setMaxValue = (value) => {
        if (value === '' || value === null) {
            value = Number.POSITIVE_INFINITY;
        }
        this.setState({
            maxValue: value
        }, () => {
            this.refreshItems();
        });
    }

    requestSort = key => {
        let direction = 'ascending';
        if (this.state.sortedColumn === key && this.state.direction === 'ascending') {
            direction = 'descending';
        }
        this.setState({
            sortedColumn: key,
            direction: direction
        }, () => {
            this.refreshItems();
        });
    }

    refreshItems = () => {
        let sortedItems = [...this.props.items];
        sortedItems.sort((a, b) => {
            let column = this.state.sortedColumn;
            if (a[column] < b[column]) {
                return this.state.direction === 'ascending' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return this.state.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        sortedItems = sortedItems.filter(item => item.price >= this.state.minValue && item.price <= this.state.maxValue);

        this.setState({
            items: sortedItems
        });
    }

    getClassNamesFor = (name) => {
        return this.state.sortedColumn === name ? this.state.direction : undefined;
    }

    render() {
        return (
            <div className="container pt-3">
                <Filters setMinValue = {this.setMinValue} setMaxValue = {this.setMaxValue}/>
                <ItemsTable
                    items ={this.state.items}
                    requestSort={this.requestSort}
                    sortItems={this.sortItems}
                    getClassNamesFor={this.getClassNamesFor}
                />
            </div>
        );
    }
}
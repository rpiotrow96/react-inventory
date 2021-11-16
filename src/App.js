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

            minValue: null,
            maxValue: null
        }
    }

    setMinValue = (value) => {
        if (value === '' || value === null) {
            value = 0;
        }
        this.setState({
            minValue: value
        }, () => {
            this.filterItems();
        });
    }

    setMaxValue = (value) => {
        if (value === '' || value === null) {
            value = Number.POSITIVE_INFINITY;
        }
        this.setState({
            maxValue: value
        }, () => {
            this.filterItems();
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
            this.sortItems();
        });
    }

    sortItems = () => {
        let sortedItems = [...this.state.items];
        if (this.state.sortedColumn !== null) {
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
        }

        this.setState({
            items: sortedItems
        });
    }

    filterItems = () => {
        this.sortItems();
        let filteredItems = [...this.props.items];
        filteredItems = filteredItems.filter(item => item.price >= this.state.minValue && item.price <= this.state.maxValue);
        this.setState({
            items: filteredItems
        })
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
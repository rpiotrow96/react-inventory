import './App.css';
import React from 'react';
import ItemsTable from './ItemsTable'
import Filters from './Filters'
import ItemForm from './ItemForm'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems: props.items,
            items: props.items,
            sortedColumn: 'id',
            direction: 'ascending',

            minValue: 0,
            maxValue: Number.POSITIVE_INFINITY,

            itemInit: {
                id: -1,
                name: '',
                price: 0,
                description: '',
                imageUrl: '',
                producer: '',
                model: '',
                documentationURL: '',
                weight: ''
            }
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
        let sortedItems = [...this.state.allItems];
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

    deleteItem = (id) => {
        const itemsWithoutDeletedItem = this.state.allItems.filter(item => item.id !== id);
        this.setState({
            allItems: itemsWithoutDeletedItem
        }, () => {
            this.refreshItems();
        });
    }

    clearItemForm = () => {
        this.setState({
            itemInit : {
                id: -1,
                name: '',
                price: 0,
                description: '',
                imageUrl: '',
                producer: '',
                model: '',
                documentationURL: '',
                weight: ''
            }
        });
    }

    addItem = (item) => {
        item.id = Math.max(...this.state.allItems.map(user => user.id))+1;

        let newArray = this.state.allItems.slice();
        newArray.push(item);
        this.clearItemForm();
        this.setState({
            allItems: newArray
        }, () => {
            this.refreshItems();
        });
    }

    handleEditItem = (item) => {
        this.setState({
            itemInit: item
        });
    }

    editItem = (item) => {
        const itemIndex = this.state.allItems.findIndex(i => i.id === item.id);
        let newArray = this.state.allItems.slice();
        newArray[itemIndex] = item;
        this.setState({
            allItems: newArray
        }, () => {
            this.refreshItems();
        });
    }

    handleChange = (item) => {
        this.setState({
            itemInit : item
        })
    }

    render() {
        return (
            <div className="container pt-3">
                <Filters setMinValue = {this.setMinValue} setMaxValue = {this.setMaxValue}/>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                    onClick={this.clearItemForm}>
                    Dodaj
                </button>

                <ItemsTable
                    items ={this.state.items}
                    requestSort={this.requestSort}
                    sortItems={this.sortItems}
                    getClassNamesFor={this.getClassNamesFor}
                    handleEditItem={this.handleEditItem}
                    deleteItem={this.deleteItem}
                />
                <ItemForm
                    item = {this.state.itemInit}
                    addItem = {this.addItem}
                    editItem = {this.editItem}
                    handleChange = {this.handleChange}
                />
            </div>
        );
    }
}
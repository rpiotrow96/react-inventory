import React from "react";
import $ from 'jquery'
import 'bootstrap';

export default class ItemForm extends React.Component {

    handleNameChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.name = event;
        this.props.handleChange(item);
    }
    handlePriceChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.price = event;
        this.props.handleChange(item);
    }
    handleDescriptionChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.description = event;
        this.props.handleChange(item);
    }
    handleImageUrlChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.imageUrl = event;
        this.props.handleChange(item);
    }
    handleProducerChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.producer = event;
        this.props.handleChange(item);
    }
    handleModelChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.model = event;
        this.props.handleChange(item);
    }
    handleDocumentationUrlChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.documentationURL = event;
        this.props.handleChange(item);
    }
    handleWeightChange(event) {
        //deep clone
        let item = JSON.parse(JSON.stringify(this.props.item));
        item.weight = event;
        this.props.handleChange(item);
    }

    checkValidation() {
        this.hideAllErrors()

        let validation = true;
        const item = this.props.item;
        if (item.name === '') {
            validation = false;
            this.showDiv('nameError');
        }
        if (item.price === '' || item.price <= 0) {
            validation = false;
            this.showDiv('priceError');
        }
        if (item.imageUrl === '') {
            validation = false;
            this.showDiv('imageUrlError');
        }
        if (item.producer === '') {
            validation = false;
            this.showDiv('producerError');
        }
        if (item.model === '') {
            validation = false;
            this.showDiv('modelError');
        }
        if (item.documentationURL === '') {
            validation = false;
            this.showDiv('documentationURLError');
        }
        if (item.weight === '') {
            validation = false;
            this.showDiv('weightError');
        }
        return validation;
    }

    hideAllErrors = () => {
        this.hideDiv('nameError')
        this.hideDiv('priceError')
        this.hideDiv('imageUrlError')
        this.hideDiv('producerError')
        this.hideDiv('modelError')
        this.hideDiv('documentationURLError')
        this.hideDiv('weightError')
    };

    showDiv(id) {
        document.getElementById(id).style.display = 'block';
    }

    hideDiv(id) {
        document.getElementById(id).style.display = 'none';
    }

    handleSubmitProduct = () => {
        let item = JSON.parse(JSON.stringify(this.props.item));

        if(!this.checkValidation()) {
            return;
        }

        $('#exampleModal').modal('hide')

        if (item.id === -1) {
            // add product
            this.props.addItem(item);
        } else {
            //edit
            this.props.editItem(item);
        }
    }

    //hide divs
    componentDidUpdate() {
        this.checkValidation();
    }

    render() {
        return(
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Dodaj nowy produkt</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input type="hidden" className="form-control" id="id" value={this.props.item.id}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="col-form-label">Nazwa</label>
                                    <input type="text" className="form-control" id="name"
                                           value={this.props.item.name}
                                           onChange={e => this.handleNameChange(e.target.value)}
                                           onKeyUp={e => this.handleNameChange(e.target.value)}/>
                                    <div id="nameError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać nazwę</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="col-form-label">Cena</label>
                                    <input type="number" className="form-control" id="price"
                                           min="0" step="0.01" value={this.props.item.price} onChange={e => this.handlePriceChange(e.target.value)}/>
                                    <div id="priceError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać cenę</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="col-form-label">Opis</label>
                                    <textarea className="form-control" id="description"
                                              value={this.props.item.description} onChange={e => this.handleDescriptionChange(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imageUrl" className="col-form-label">URL obrazka</label>
                                    <input type="text" className="form-control" id="imageUrl"
                                           value={this.props.item.imageUrl} onChange={e => this.handleImageUrlChange(e.target.value)}/>
                                    <div id="imageUrlError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać URL obrazka</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="producer" className="col-form-label">Producent</label>
                                    <input type="text" className="form-control" id="producer"
                                           value={this.props.item.producer} onChange={e => this.handleProducerChange(e.target.value)}/>
                                    <div id="producerError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać producenta</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="model" className="col-form-label">Model</label>
                                    <input type="text" className="form-control" id="model"
                                           value={this.props.item.model} onChange={e => this.handleModelChange(e.target.value)}/>
                                    <div id="modelError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać model</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="documentationURL" className="col-form-label">URL Dokumentacji</label>
                                    <input type="text" className="form-control" id="documentationURL"
                                           value={this.props.item.documentationURL} onChange={e => this.handleDocumentationUrlChange(e.target.value)}/>
                                    <div id="documentationURLError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać URL do dokumentacji</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="weight" className="col-form-label">Waga</label>
                                    <input type="text" className="form-control" id="weight"
                                           value={this.props.item.weight} onChange={e => this.handleWeightChange(e.target.value)}/>
                                    <div id="weightError" className="error" style={{display: 'none'}}>
                                        <span >Proszę podać wagę</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                            <button type="button" id="btnSubmit" className="btn btn-primary" onClick={this.handleSubmitProduct}>Wyślij</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
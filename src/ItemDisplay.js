import React from "react";

export default class ItemDisplay extends React.Component {
    render() {
        return(
            <div className="modal fade" id="itemDisplay" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.item.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm">
                                    <img src={this.props.item.imageUrl} alt={this.props.item.name}/>
                                </div>
                                <div className="col-sm d-flex align-items-center">
                                    <p>{this.props.item.description}</p>
                                </div>
                            </div>
                            <div className="row modal-footer">
                                <div className="col-sm">
                                    <p>Producent: {this.props.item.producer}</p>
                                </div>
                                <div className="col-sm">
                                    <p>Cena: {this.props.item.price} zł</p>
                                </div>
                            </div>
                            <div className="row modal-footer">
                                <div className="col-sm">
                                    <p>Model: {this.props.item.model}</p>
                                </div>
                                <div className="col-sm">
                                    <p>Waga: {this.props.item.weight}</p>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center modal-footer">
                                <a href={this.props.item.documentationURL} target="_blank" rel="noreferrer">Link do dokumentacji</a>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
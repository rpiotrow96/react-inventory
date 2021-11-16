import React from "react";

export default class ItemsTable extends React.Component{

    render()
    {
        return (
            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th>
                        <button type="button" onClick={() => this.props.requestSort('id')}
                                className={`btn btn-light btn-sm ${this.props.getClassNamesFor('id')}`}>
                            ID
                        </button>
                    </th>
                    <th>
                        <button type="button" onClick={() => this.props.requestSort('name')}
                                className={`btn btn-light btn-sm ${this.props.getClassNamesFor('name')}`}>
                            Nazwa
                        </button>
                    </th>
                    <th>
                        <button type="button" onClick={() => this.props.requestSort('price')}
                                className={`btn btn-light btn-sm ${this.props.getClassNamesFor('price')}`}>
                            Cena
                        </button>
                    </th>
                    <th>
                        <button type="button" onClick={() => this.props.requestSort('producer')}
                                className={`btn btn-light btn-sm ${this.props.getClassNamesFor('producer')}`}>
                            Producent
                        </button>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.items.map(product => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price} zł</td>
                                <td>{product.producer}</td>
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-outline-primary">Pokaż</button>
                                        <button className="btn btn-outline-success">Edytuj</button>
                                        <button className="btn btn-outline-danger" onClick={() => this.props.deleteItem(product.id)}>Usuń</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}
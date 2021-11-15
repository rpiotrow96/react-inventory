import React from "react";

const useSortedItems = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    return { items: sortedItems, requestSort, sortConfig };
}

function ItemsTable(props) {

    const newItems = props.items;
    const { items, requestSort, sortConfig } = useSortedItems(newItems);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <table className="table table-striped table-dark">
        <thead>
        <tr>
            <th>
                <button type="button" onClick={() => requestSort('id')} className={`btn btn-light btn-sm ${getClassNamesFor('id')}`}>
                    ID
                </button>
            </th>
            <th>
                <button type="button" onClick={() => requestSort('name')} className={`btn btn-light btn-sm ${getClassNamesFor('name')}`}>
                    Nazwa
                </button>
            </th>
            <th>
                <button type="button" onClick={() => requestSort('price')} className={`btn btn-light btn-sm ${getClassNamesFor('price')}`}>
                    Cena
                </button>
            </th>
            <th>
                <button type="button" onClick={() => requestSort('producer')} className={`btn btn-light btn-sm ${getClassNamesFor('producer')}`}>
                    Producent
                </button>
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {
            items.map(product => {
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
                            <button className="btn btn-outline-danger">Usuń</button>
                        </div>
                    </td>
                </tr>
            );
        })}
        </tbody>
    </table>
    );
}

export default ItemsTable;
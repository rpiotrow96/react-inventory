import './App.css';
import itemsJson from "./items.json";

function App() {
  return (
    <div className="container pt-3">
      <table className="table table-striped table-dark">
        <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa</th>
          <th>Cena</th>
          <th>Producent</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        {itemsJson.items.map(item => {
          return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price} zł</td>
                <td>{item.producer}</td>
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
    </div>
  );
}

export default App;

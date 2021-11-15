import React from "react";

function Filters(props) {
    return (
        <div className="container my-3">
            <div className="row m-0">
                <div className="col-lg-2 px-2">
                    <input id="priceFromInput" className="form-control" type="number" placeholder="Od" min="0" step="0.01"
                           onChange={ event => props.setMinValue(event.target.value) }
                    />
                </div>
                <div className="col-lg-2 px-2">
                    <input id="priceToInput" className="form-control" type="number" placeholder="Do" min="0" step="0.01"
                           onChange={ event => props.setMaxValue(event.target.value) }
                    />
                </div>
            </div>
        </div>
    );
}

export default Filters;
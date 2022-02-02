import React, {
    useState,
    useEffect
} from "react";
import ProductDataService from "../services/product"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faEye } from '@fortawesome/fontawesome-free-solid'
//import { Link } from "react-router-dom"

function ProductList()

{
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState("");


    useEffect(() => {
        retrieveProducts();

    }, []);


    const retrieveProducts = () => {
        ProductDataService.getAll()
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const find = (by, query) => {
        ProductDataService.find(by, query)
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(e => {
               console.log(e);
            });
    };

    const findByName = () => {
        find("name", searchName);
    };

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const viewStyle = {
        width: "50px",
        textAlign: "center"
    };

    const editStyle = {
        width: "50px",
        textAlign: "center"
    };

    const deleteStyle = {
        width: "50px",
        textAlign: "center"
    };

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>View</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product._id.toString()}>
                                    <td style={viewStyle}>
                                        <button className="btn btn-primary btn-sm rounded-0" type="button"
                                                data-toggle="tooltip" data-placement="top" title="View">
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{(product.purchase_price).toLocaleString('en-US', {style: 'currency',currency: 'USD'})}</td>
                                    <td style={editStyle}>
                                        <button className="btn btn-success btn-sm rounded-0" type="button"
                                                data-toggle="tooltip" data-placement="top" title="Edit">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                    <td style={deleteStyle}>
                                        <button className="btn btn-danger btn-sm rounded-0" type="button"
                                                data-toggle="tooltip" data-placement="top" title="Delete">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;
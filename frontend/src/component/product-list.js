import React from "react";
import ProductDataService from "../services/product"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faEye } from '@fortawesome/fontawesome-free-solid'

/**
 * Product List
 *
 * This component handles the product list and the search component for the product list.
 */
class ProductList extends React.Component
{
    /**
     * Constructor
     *
     * Pretty standard set the state vars and retrieve the initial product list.
     * @param props Standard react Props
     */
    constructor(props)
    {
        super(props)
        this.state = {
            products: [],
            searchName: ""
        }
        /** Retrieve the initial product list */
        this.retrieveProducts();
    }

    /**
     * On Search Name Change
     *
     * This handles when something is typed into the search bar.
     * @param e Event object
     */
    onSearchNameChange(e)
    {
        this.setState({ searchName: e.target.value })
    }

    /**
     * On Key Down
     *
     * This method is triggered by the on key down event. It checks if
     * Enter was pressed, if it was it calls the findByName.
     * @param e Event object
     */
    onKeyDown(e)
    {
        if(e.key === "Enter")
        {
            this.findByName();
        }
    }

    /**
     * Retrieve Products
     *
     * This method will get the full product list and update the state variable.
     */
    retrieveProducts()
    {
        ProductDataService.getAll()
            .then(response => {
                this.setState({products: response.data.products});
            })
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Find
     *
     * This method will find all the products that match the search criteria.
     * @param by        What field you are searching by
     * @param query     What to search for
     */
    find(by, query)
    {
        ProductDataService.find(by, query)
            .then(response => {
                this.setState({products: response.data.products});
            })
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Find By Name
     *
     * This method is an interface to the find method it passes the
     * by value as name and the query will always be the searchName state
     * value.
     */
    findByName()
    {
        this.find("name", this.state.searchName);
    };

    render()
    {
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

        /**
         * This is the basic render method called by react.
         */
        return (
            <div>
                <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            onChange={this.onSearchNameChange.bind(this)}
                            onKeyDown={this.onKeyDown.bind(this)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByName.bind(this)}
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
                        {this.state.products.map((product) => {
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
}

export default ProductList;
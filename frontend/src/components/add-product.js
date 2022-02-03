import React from "react";




class AddProduct extends React.Component
{
    form_value = {
        name: "",
        description: "",
        retail_link: "",
        quantity: "",
        purchase_price: "",
        sell_price: "",
        retail_price: ""
    };

    onFieldChange(event)
    {
        const target = event.target;
        const field = event.target.id;
        const value = event.target.value;
        this.form_value[field] = value;
        switch (field)
        {
            case 'name':
            case 'description':
            case 'retail_link':
                if(value === "")
                {
                    target.classList.add("is-invalid");
                } else
                {
                    target.classList.remove("is-invalid");
                }
                break;
            case 'quantity':
                if(value === "" || !Number.isInteger(value))
                {
                    target.classList.add("is-invalid");
                } else
                {
                    target.classList.remove("is-invalid");
                }
                break;
            case 'purchase_price':
                console.log("purchase price");
                break;
            case 'sell_price':
                console.log("sell price changed");
                break;
            case 'retail_price':
                console.log('retail price changed');
                break;


            default:
                console.log("Field not found.");
        }

    }

    onSubmit(e)
    {
        e.preventDefault()
        alert("submit clicked")
    }

    render()
    {
        return (
            <div>
                <form className="needs-validation">
                    <div className="form-row">
                        <label htmlFor="id">
                            ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="id"
                            disabled
                            />
                    </div>
                    <div className="form-row">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Awesome Product"
                            onChange={this.onFieldChange.bind(this)}
                            required
                            />
                    </div>
                    <div className="form-row">
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            placeholder="An amazing eye catching product description!"
                            onChange={this.onFieldChange.bind(this)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="retail_link">
                            Retail Link
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="retail_link"
                            placeholder="https://www.amazon.com/dp/B08DCFSHFR?tag=opr-mkt-opr-us-20&ascsubtag=1ba00-01000-ubp00-win10-other-nomod-us000-pcomp-feature-scomp-feature-scomp&ref=aa_scomp"
                            onChange={this.onFieldChange.bind(this)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="quantity">
                            Stock Quantity
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="quantity"
                            placeholder="100"
                            onChange={this.onFieldChange.bind(this)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="purchase_price">
                            Price purchased for
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="purchase_price"
                            placeholder="6.99"
                            onChange={this.onFieldChange.bind(this)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="sell_price">
                            Price we sell at
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="sell_price"
                            placeholder="19.99"
                            onChange={this.onFieldChange.bind(this)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="retail_price">
                            Current Retail Price
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="retail_price"
                            placeholder="29.99"
                            onChange={this.onFieldChange.bind(this)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={this.onSubmit.bind(this)}
                            >Add Product</button>
                    </div>
                </form>
            </div>
        );
    }
}




export default AddProduct;
import React from "react";

/**
 * Add Product
 *
 * This will handle the add product component.
 */
class AddProduct extends React.Component
{
    form_value = {
        name: {
            value:"",
            is_valid: false
        },
        description: {
            value:"",
            is_valid: false
        },
        retail_link: {
            value:"",
            is_valid: false
        },
        quantity: {
            value:"",
            is_valid: false
        },
        purchase_price: {
            value:"",
            is_valid: false
        },
        sell_price: {
            value:"",
            is_valid: false
        },
        retail_price: {
            value:"",
            is_valid: false
        }
    };

    onFieldChange(event)
    {
        const target = event.target;
        const field = event.target.id;
        const value = event.target.value;
        this.form_value[field].value = value;
        this.form_value[field].is_valid = this.validate(
            target,
            field,
            value
        );
    }

    /**
     * Form is valid
     *
     * I could switch this up and just return on the first false. But I want
     * it to validate the whole form so it updates the classes for each input
     * to visually show the user where the errors are.
     * @returns {boolean} true if the form is valid false if it is not.
     */
    formIsValid()
    {
        let is_valid = true;
        for(let field in this.form_value)
        {
            this.form_value[field].is_valid = this.validate(
                document.getElementById(field),
                field,
                this.form_value[field].value
            )
            if(!this.form_value[field].is_valid)
            {
                is_valid = false;
            }
        }
        return is_valid;
    }

    validate(target, key, value)
    {
        let is_valid = false;
        switch (key)
        {
            case 'name':
            case 'description':
            case 'retail_link':
                if(value === "")
                {
                    is_valid = false;
                    break;
                }
                is_valid = true;
                break;
            case 'quantity':
                if(value === "" || !Number.isInteger(value))
                {
                    is_valid = false;
                    break;
                }
                is_valid = true;
                break;
            case 'purchase_price':
            case 'sell_price':
            case 'retail_price':


                console.log('retail price changed');
                break;


            default:
                console.log("Field not found.");
        }
        /** @todo check if avoiding else to avoid branch prediction is viable in javascript. */
        if(is_valid)
        {
            // DOM manipulation is expensive so don't touch the dom if you don't need to.
            if(target.classList.contains("is-invalid"))
            {
                target.classList.remove("is-invalid");
            }
            return is_valid;
        }
        // DOM manipulation is expensive don't touch the dom if you don't need to.
        if(!target.classList.contains("is-invalid"))
        {
            target.classList.add("is-invalid");
        }
        return is_valid;
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
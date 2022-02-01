import React, {
    useState,
    useEffect
} from "react";
import ProductDataService from "../services/product"
import { Link } from "react-router-dom"




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
                console.log(response.data);
                setProducts(response.data.products);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshProducts = () => {
        retrieveProducts();
    };

    const onChangeSearchName = e => {
        console.log("taco");
        const searchName = e.target.value;
        setSearchName(searchName);
    };



    return (
        <div className="App">
            <div className="row pb-1">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={onChangeSearchName}
                />
            </div>
        </div>
    );
}

export default ProductList;
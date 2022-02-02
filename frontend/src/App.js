import React from "react";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/** Import the components */
import Login from "./components/login.js";
import ProductList from "./components/product-list.js";
import Products from "./components/products.js";


/**
 * Main App function
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo implement real login system
 */
function App()
{
    const [user, setUser] = React.useState(null);
    async function login(user = null)
    {
        setUser(user);
    }
    /**async function logout()
    {
        setUser(null);
    }*/


    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/inventory" className="navbar-brand">
                    &nbsp;The Mystery Market
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/products"} className="nav-link">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/products"]} component={ProductList} />
                    <Route
                        path="/products/:id"
                        render={(props) => (
                            <Products {...props} user={user} />
                        )}
                    />


                    <Route
                        path="/login"
                        render={(props) => (
                            <Login {...props} login={login} />
                        )}
                    />
                </Switch>
            </div>
        </div>
    );
}

export default App;

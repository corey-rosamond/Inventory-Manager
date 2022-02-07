import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";

/**
 * Login
 *
 * This is the long page component.
 */
class LoginScreen extends React.Component
{
    constructor(params) {
        super(params);
        this.state = {
            email_address: "",
            password: "",
            error: ""
        };
    }


    onEmailChange(event)
    {
        let target = event.target;
        this.setState({email_address: target.value});
    }

    onPasswordChange(event)
    {
        let target = event.target;
        this.setState({password: target.value});
    }

    async onSubmit(event)
    {
        try
        {
            event.preventDefault();
            let email_address = this.state.email_address;
            let password = this.state.password;
            const config = {
                header:{
                    'Content-Type': 'application/json'
                }
            };

            let data = await axios.post(
                "http://127.0.0.1:5000/api/users/login",
                {
                    email_address,
                    password
                },
                config
            ).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
            });

            //localStorage.setItem("authorization_token", data.token);
        } catch(error)
        {
            console.log(error)
            //this.setState({
//                error: error.response.data.error
//            });
        }
    }

    /**
     * Render
     *
     * This will render the login form.
     * @returns {JSX.Element}
     */
    render()
    {
        let submitButtonStyles ={
            paddingLeft: "2.5rem",
            paddingRight: "2.4rem"
        }
        return (
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email_address">
                                        Email Address:
                                    </label>
                                    <input
                                        type="email"
                                        id="email_address"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        onChange={this.onEmailChange.bind(this)}
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label htmlFor="password">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Password"
                                        onChange={this.onPasswordChange.bind(this)}
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-outline mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            style={submitButtonStyles}
                                            >
                                            Login
                                        </button>
                                    </div>
                                    <Link to="/forgot-password" className="text-body">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

// Export the LoginScreen
export default LoginScreen;


/**
 const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                config
            );

            localStorage.setItem("authToken", data.token);

            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen__form">
                <h3 className="login-screen__title">Login</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password:{" "}
                        <Link to="/forgotpassword" className="login-screen__forgotpassword">
                            Forgot Password?
                        </Link>
                    </label>
                    <input
                        type="password"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        tabIndex={2}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>

                <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
            </form>
        </div>
    );
};*/
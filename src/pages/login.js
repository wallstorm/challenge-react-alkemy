import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { useAuth } from "../use-auth";
import { useHistory, useLocation } from "react-router-dom";

function Login () {   
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    function signIn() {
        let { from } = location.state || { from: { pathname: "/" } };
        
        auth.signin(() => {
            history.replace(from);
        });
    }

    return (
        <div className="container">
            <h1>Sign In</h1>
            <div className="row">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (values.email.length === 0 || values.password.length === 0) {
                            setSubmitting(false);
                            return alert("ERROR... campos vacios.");
                        }
                        axios.post('http://challenge-react.alkemy.org/', {
                            email: values.email,
                            password: values.password
                        }).then(response => {
                            localStorage.setItem('token', response.data.token);
                            signIn();
                        }).catch(error => {
                            console.log(error);
                        });

                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <Field className="form-control" type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <Field className="form-control" type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                                Log in
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="row">
                
            </div>
            
        </div>
    );
};

export default Login;
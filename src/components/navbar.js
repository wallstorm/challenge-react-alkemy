import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../use-auth';

// componentes
import {AuthButton} from './auth-button';

function Navbar() {
    let auth = useAuth();
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <Link className="navbar-brand" to="/">
                    <img src="https://image.flaticon.com/icons/png/512/1149/1149415.png" width="110" alt="catwoman" />
                    AppHero
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                    <ul className="navbar-nav">
                        {auth.token ?
                            <>
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/create-team" className="nav-link">Create team</Link>
                                </li>
                            </>
                        : null}
                    </ul>
                    <span className="navbar-text p-2">
                        <AuthButton />
                    </span>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
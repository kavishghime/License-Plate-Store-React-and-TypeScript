import React from 'react';
import { CurrencyDropdown } from '../currency/CurrencyDropdown';
import { Link } from "react-router-dom";
import { Currency } from '../license-plate-data.type';

export interface NavigationProps {
    currency: Currency;
    onCurrencyChange: (newCurrency: Currency) => void
}


export class Navigation extends React.Component<NavigationProps> {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">License Plate Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                            {/* <a className="nav-link">Home <span className="sr-only">(current)</span></a> */}
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">My cart</Link>
                            {/* <a className="nav-link"  >My cart <span className="sr-only"></span></a> */}
                        </li>
                        <li className="nav-item">
                            <Link to="/checkout" className="nav-link">
                                Checkout
                            </Link>
                            {/* <a className="nav-link" >Checkout <span className="sr-only"></span></a> */}
                        </li>

                    </ul>

                    {/* <CurrencyDropdown onCurrencyChange={this.props.onCurrencyChange}
                        currency={this.props.currency} /> */}

                    <CurrencyDropdown {...this.props} />


                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        )
    }
}
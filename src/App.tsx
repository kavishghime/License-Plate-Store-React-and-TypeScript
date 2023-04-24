import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from './navigation/Navigation';
import { Jumbotron } from './jumbotron/Jumbotron';
import { LicensePlate } from './license-plate/LicensePlate';
// import { CALIFORNIA_PLATE, LICENSE_PLATES } from "./mock-data";
import { Currency, LicensePlateData, CurrencyInfo } from './license-plate-data.type';
import { Spinner } from './spinner/Spinner';
import { CheckoutForm } from './checkout-form/CheckoutForm';
import { StoreView } from './store-view/StoreView';
import { CartView } from './cart-view/CartView';
import { CheckoutView } from './checkout-view/CheckoutView';

export interface AppState {
	currencyInfo: CurrencyInfo;

	exchangeRates: Record<Currency, number>
}

export class App extends React.Component<{}, AppState> {

	state: AppState = {
		currencyInfo: { currency: "USD", exchangeRate: 1 },
		exchangeRates: { USD: 1, GBP: 1, EUR: 1 }
	}

	componentDidMount() {
		fetch("http://localhost:8000/rates")
			.then(r => r.json())
			.then(data => this.setState({ exchangeRates: data }))
	}

	setCurrency = (curr: Currency) => {
		this.setState(state => ({ currencyInfo: { currency: curr, exchangeRate: state.exchangeRates[curr] } }));
	}


	render() {
		return (
			<div className="App">

				<header className="App-header">
				</header>

				<BrowserRouter>
					<Navigation
						onCurrencyChange={this.setCurrency}
						currency={this.state.currencyInfo.currency}
					/>
					<main role="main">
						<Routes>
							<Route path="/" element={<StoreView currencyInfo={this.state.currencyInfo} />} />
							<Route path="/cart" element={<CartView currencyInfo={this.state.currencyInfo} />} />
							<Route path="/checkout" element={<CheckoutView />} />
						</Routes>
					</main>
				</BrowserRouter>
			</div >
		);
	}
};

import React, { Component } from 'react';
import './LicensePlate.css';
import { Currency, CurrencyInfo, LicensePlateData } from '../license-plate-data.type';

export interface LicensePlateProps {
	buttonText: string;
	plate: LicensePlateData;
	currencyInfo: CurrencyInfo;
	onButtonClicked: (plate: LicensePlateData) => void;

}

const CURRENCIES: Record<Currency, string> = { EUR: "€", USD: "$", GBP: "£" };

export class LicensePlate extends Component<LicensePlateProps> {

	buttonClicked = () => {
		// alert("Plate added to cart");
		this.props.onButtonClicked(this.props.plate);
	}

	render() {
		const plate = this.props.plate;
		const { currency, exchangeRate } = this.props.currencyInfo;
		return (
			<>
				<h2>
					{plate.title}
					{plate.onSale && <img src={process.env.PUBLIC_URL + "sale.png"} />}
				</h2>
				<img src={plate.picture} className="img-fluid" />
				<p>{plate.description}</p>
				<div>
					<h2 className="float-left">
						{CURRENCIES[currency]}{(plate.price / exchangeRate).toFixed(2)}
					</h2>
					<button onClick={this.buttonClicked} className="btn btn-primary float-right" role="button" >
						{this.props.buttonText}
					</button>
				</div>
			</>
		);
	}

}
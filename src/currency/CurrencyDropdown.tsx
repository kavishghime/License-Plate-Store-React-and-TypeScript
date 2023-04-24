import React, { FC, FunctionComponent, useEffect, useRef, useState } from 'react';
import './CurrencyDropdown.css';
import { Currency } from '../license-plate-data.type';

export interface CurrencyDropdownProps {
	currency: Currency;
	onCurrencyChange: (newCurrency: Currency) => void
}

// export const CurrencyDropdown: FC<CurrencyDropdownProps> = (props: CurrencyDropdownProps) => {
export function CurrencyDropdown(props: CurrencyDropdownProps) {

	let [showItems, setShowItems] = useState<boolean>(false);
	// let [currency, setCurrency] = useState<Currency>("USD");
	const button = useRef<HTMLButtonElement>(null);

	const changeCurrency = (curr: Currency) => {
		props.onCurrencyChange(curr);
		setShowItems(false);
	}

	useEffect(() => {
		const listener = (event: Event) => {
			if (event.target !== button.current)
				setShowItems(false)
		}
		window.addEventListener("click", listener);
		return () => window.removeEventListener("click", listener);
	}, []);

	return (
		<div className="btn-group margin10">
			<button type="button" onClick={() => setShowItems(true)} ref={button}
				className="btn btn-info dropdown-toggle" data-toggle="dropdown">
				{/* {currency} */}
				{props.currency}
			</button>
			<div className={showItems ? "dropdown-menu show" : "dropdown-menu"}>
				<a className="dropdown-item"
					onClick={() => {
						setShowItems(false);
						// setCurrency('USD');
						props.onCurrencyChange('USD');
					}
					}>
					USD ($)
				</a>
				<a className="dropdown-item"
					onClick={() => {
						setShowItems(false);
						// setCurrency('EUR');
						props.onCurrencyChange('EUR');
					}
					}>
					EUR (€)
				</a>
				<a className="dropdown-item"
					onClick={() => {
						setShowItems(false);
						// setCurrency('GBP');
						props.onCurrencyChange('GBP');
					}
					}>
					GBP (£)
				</a>
			</div>
		</div>
	);
};



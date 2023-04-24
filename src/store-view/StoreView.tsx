import React from 'react';
import { Jumbotron } from '../jumbotron/Jumbotron';
import { Spinner } from '../spinner/Spinner';
import { CheckoutForm } from '../checkout-form/CheckoutForm';
import { LicensePlate } from '../license-plate/LicensePlate';
import { Currency, CurrencyInfo, LicensePlateData } from '../license-plate-data.type';
import { PopupWindow } from '../popup/PopupWindow';
import { addToCart } from '../cart-service/cart-service';

interface StoreViewState {
    licensePlates: LicensePlateData[];
    isLoading: boolean;
    showPopup: boolean;
}

export interface StoreViewProps {
    currencyInfo: CurrencyInfo;
}


export class StoreView extends React.Component<StoreViewProps, StoreViewState> {
    state: StoreViewState = {
        licensePlates: [],
        isLoading: true,
        showPopup: false
    }

    addToCart = (plate: LicensePlateData) => {
        addToCart(plate).then(() => {
            this.setState({ showPopup: true });
        });
    }


    componentDidMount() {
        fetch('http://localhost:8000/data')
            .then(response => response.json())
            .then(data => this.setState({ licensePlates: data, isLoading: false }));
    }

    render() {
        return (
            <main role="main">

                {/* Add Jumbotron here */}
                <Jumbotron
                    title="Welcome to our store"
                    description="Browse our collection of license plates"
                />

                {/* License plates go here */}
                <div className="container" >

                    <div className="row" >
                        {this.state.isLoading && <Spinner />}
                        {this.state.licensePlates.map((licensePlate, index) => (
                            <div key={licensePlate._id}
                                className={`col-md-4 ${(index % 2 === 0) ? 'highlight' : ''}`}
                            >
                                <LicensePlate
                                    plate={licensePlate}
                                    currencyInfo={this.props.currencyInfo}
                                    buttonText="Add to cart"
                                    onButtonClicked={this.addToCart}
                                />
                            </div>
                        )
                        )}
                    </div>
                </div>

                <PopupWindow show={this.state.showPopup}
                    onClose={() => { this.setState({ showPopup: false }); }}>
                </PopupWindow>

            </main >
        );
    }

}

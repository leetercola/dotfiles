import _ from 'lodash';
import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import {updateAvailability} from './actions';
import BoundView from './views/container';

class Fulfillment {
	constructor (options) {
		this.store = createStore(reducer);
		this.skusHash = {};
		this.updateAvailability(options);
	}

	_addReactComponent (sku) {
		render(
			<Provider store={ this.store }>
				<BoundView idSelector={ sku.idSelector }/>
			</Provider>,
			document.getElementById(sku.idSelector)
		);
	}

	updateAvailability (updates) {
		this.store.dispatch(updateAvailability(updates));
		this.addNewSkus(updates.skus);
	}

	/**
	 * Add sku to skuHash.
	 * @param skus
	 * @returns {{}|*}
	 */
	addNewSkus (skus) {
		_.each(skus, function (sku) {
			if (typeof this.skusHash[sku.idSelector] === 'undefined') {
				this._addReactComponent(sku);
				this.skusHash[sku.idSelector] = true;
			}
		}, this);

		return this.skusHash;
	}

	removeSkuById (idSelector) {
		try {
			if (this.skusHash[idSelector]) {
				unmountComponentAtNode(document.getElementById(idSelector));
				delete this.skusHash[idSelector];

				return true;
			}
		}		catch (e) {
			window.console.error(e);
		}

		return false;
	}
}

export default Fulfillment;

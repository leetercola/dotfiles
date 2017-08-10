import _ from 'lodash';
import App from './app';
import Translation from '../src/translation/index';

/**
 * How to use this class:
 *
 * The intent is that you create an instance of this, and call addSkus as
 * you want to render them onto the screen. If you call udateLocation, all
 * prior data will be removed from the existing skus, and you will want to
 * 'addSkus' again to render the skus to the screen.
 *
 * We do this because the state of those skus are no longer valid. Therefore
 * the translated and hydrated data is no longer around. Since the component
 * does not know about the viewport, and since we don't want to call and hydrate
 * every sku in the array, we keep things simple and let the page manage what
 * to display.
 */
class Fulfillment {
	/**
	 * This constructor sets up the component. But it does not make a call.  The root level options are specific things that do not change for the life of the page.
	 * @param options {{domain:any, shippingServiceDisabled:boolean, instorePickupServiceDisabled:boolean, ispuChangeLinkDisplayText:string, tierCode: string, location: {storeId:string, zipCode:string} }}
	 */
	constructor (options) {
		this._validateConstructorOptions(options);
		this.servicesDomain = options.domain || '';

		this._availabilityStatuses = {};
		this._availabilityStatuses['PRE_ORDER'] = 'preorder';
		this._availabilityStatuses['PRE_ORDER_MOBILE'] = 'preorder';
		this._availabilityStatuses['IN_STORE_ONLY'] = 'instoreonly';
		this._availabilityStatuses['CHECK_STORES'] = 'checkstores';
		this._availabilityStatuses['COMING_SOON'] = 'comingsoon';
		this._availabilityStatuses['SOLD_OUT_ONLINE'] = 'soldoutonline';
		this._availabilityStatuses['SOLD_OUT'] = 'soldoutonline';
		this._availabilityStatuses['NOT_AVAILABLE'] = 'soldoutonline';
		this._availabilityStatuses['NOT_FOR_INDIVIDUAL_SALE'] = 'soldoutonline';

		this.skus = [];
		this.location = options.location;

		if (options.tierCode) {
			this.tierCode = options.tierCode;
		}

		this._initializeService();
	}

	_initializeService () {
		this.translation = new Translation({
			'domain': this.servicesDomain,
			'shippingServiceDisabled': this.shippingServiceDisabled,
			'instorePickupServiceDisabled': this.instorePickupServiceDisabled,
			'tierCode': this.tierCode,
			'ispuChangeLinkDisplayText': this.ispuChangeLinkDisplayText
		});
	}

	/**
	 * This will hydrate and translate the new skus, and add them to the list of existing skus. It does not check for duplicates or perform any other action.
	 * @param newSkus
	 * @param skipRendering
	 * @returns {*|Promise.<TResult>}
	 */
	loadSkus (newSkus, skipRendering) {
		this._validateSkus(newSkus);

		// Provide an opportunity to cleanup any bad setup data.
		if (window.stipsPhoenixLoadSkus) {
			window.stipsPhoenixLoadSkus(newSkus);
		}

		// Check to see if we already have a fully hydrated sku for this selector
		var skusToTranslate = [];
		var currentlyExistingSku;

		_.each(newSkus, function (sku) {
			// Always ensure we're not retaining previous data, as some teams are passing the same sku back in multiple times.
			this._cleanupOldSkuProps(sku);

			// Look to see if we have this in our list already. We go by the DOM ID since react will render to that.
			currentlyExistingSku = _.find(this.skus, _.matchesProperty('idSelector', sku.idSelector));

			if (typeof currentlyExistingSku === 'undefined') {
				skusToTranslate.push(sku);
				this.skus.push(sku);
			} else {
				// Cleanup the existing data.
				this._cleanupOldSkuProps(currentlyExistingSku);

				// We need to hydrate and transform this one, but it's in our sku list
				// already. So lets migrate any new values and add it to the translation list.
				currentlyExistingSku = _.extend(currentlyExistingSku, sku);
				skusToTranslate.push(currentlyExistingSku);
			}
		}.bind(this));

		// Now translate and render
		return this.translation.translateSkus(skusToTranslate, this.location)
			.bind(this)
			.then(function (data) {
				if (!skipRendering) {
					// Provide an opportunity to cleanup any bad data before rendering.
					if (window.stipsPhoenixRendering) {
						window.stipsPhoenixRendering(this.skus);
					}

					this.render();
				}

				return this.skus;
			});
	}

	removeAllSkus () {
		if (this.skus && _.isArray(this.skus)) {
			if (this.app) {
				_.each(this.skus, function (sku) {
					this.app.removeSkuById(sku.idSelector);
				}, this);

				this.skus = [];
			} else {
				this._warn('No React app yet, so nothing to do here.');
			}
		} else {
			this._warn('No skus to remove.');
		}
	}

	/**
	 *
	 * @param idSelectors {Array} an array of the DOM id's to remove from the internal cache.
	 */
	removeSkusByIdSelector (idSelectors) {
		if (idSelectors && _.isArray(idSelectors) && idSelectors.length) {
			if (this.app) {
				_.each(idSelectors, function (idSelector) {
					if (this.app.removeSkuById(idSelector)) {
						_.remove(this.skus, function (sku) {
							return sku.idSelector === idSelector;
						});
					}
				}, this);
			} else {
				this._warn('No React app yet, so nothing to do here.');
			}
		} else {
			this._warn('No idSelectors passed in.');
		}
	}

	/**
	 * Lets not re-render everything at this point, as we'd need to re-fetch everything and much of it could be out of the viewport. Instead we'll clear the sku list, and let the page call to render
	 * @param locationUpdates
	 */
	updatelocation (locationUpdates) {
		this._validatelocation(locationUpdates);
		_.merge(this.location, locationUpdates);
		this.skus = [];

		// The service holds on to loctation values on construction. We may need to re-new up the object.
		if (this.instorePickupServiceDisabled) {
			// New this up again, since we know there is internal state for the underlying service.
			this._initializeService();
		}
	}

	/**
	 * Use this to get our internal representation of a button state id.
	 * "sku"."buttonState"."buttonStateID": "ADD_TO_PACKAGE" AND "buttonState"."displayName": "Pre-Order"
	 * @param buttonStateId
	 * @param displayName
	 * @returns {*}
	 */
	translateButtonStateIdToAvailabilityStatus (buttonStateId, displayName) {
		// There is one case where this isn't the
		if ((buttonStateId === 'ADD_TO_PACKAGE' || buttonStateId === 'UPGRADE_YOUR_PHONE' || buttonStateId === 'ADD_TO_PACKAGE_MOBILE') && displayName === 'Pre-Order') {
			return this._availabilityStatuses['PRE_ORDER'];
		}

		return this._availabilityStatuses[buttonStateId];
	}

	_validateConstructorOptions (options) {
		if (!options) {
			throw 'Options must be passed into the lib-fulfillment-view constructor.';
		}

		this._validateTierCode(options.tierCode);

		// Set defaults to false if they don't evaluate to truthy.
		if (!options.shippingServiceDisabled) {
			this.shippingServiceDisabled = false;
		}		else {
			this.shippingServiceDisabled = true;
		}

		if (options.ispuChangeLinkDisplayText) {
			this.ispuChangeLinkDisplayText = options.ispuChangeLinkDisplayText;
		}		else {
			this.ispuChangeLinkDisplayText = '';
		}

		// Set defaults to false if they don't evaluate to truthy.
		if (!options.instorePickupServiceDisabled) {
			this.instorePickupServiceDisabled = false;
		}		else {
			this.instorePickupServiceDisabled = true;
		}

		this._validatelocation(options.location);
	}

	_validatelocation (location) {
		if (!location) {
			throw 'Location must be an object.';
		}

		if (location.storeId && !location.zipCode) {
			// set the ISUP service to disabled
			this.shippingServiceDisabled = true;
			this._validateStoreId(location.storeId);
		}		else if (location.zipCode && !location.storeId) {
			// set the ISUP service to disabled
			this.instorePickupServiceDisabled = true;
			this._validateZipCode(location.zipCode);
		}		else {
			this._validateStoreId(location.storeId);
			this._validateZipCode(location.zipCode);
		}
	}

	_isNumberOfSize (numString, max) {
		var num = parseInt(numString, 10);

		return (!isNaN(num)) && (num <= max);
	}

	_validateTierCode (tierCode) {
		if (tierCode) {
			if (typeof tierCode !== 'string') {
				throw 'The tierCode must be a string.';
			}

			if (!this._isNumberOfSize(tierCode, 99999999)) {
				throw 'The tierCode string must contain a number.';
			}
		}
	}

	_validateZipCode (zipCode) {
		if (typeof zipCode !== 'string') {
			throw 'The zipCode must be a string.';
		}

		if (!this._isNumberOfSize(zipCode, 99999)) {
			throw 'The zipCode must be a 5 digit number.';
		}
	}

	_validateStoreId (storeId) {
		if (typeof storeId !== 'string') {
			throw 'The storeId must be a string.';
		}

		if (!this._isNumberOfSize(storeId, 9999)) {
			throw 'The storeId string must contain a number, up to 4 digits.';
		}
	}

	_isValidConditionType (condition) {
		return (['fair', 0, 'satisfactory', 1, 'certified', 2, 'excellent', 3, 'new'].indexOf(parseInt(condition, 10)) > -1);
	}

	_validateSkus (skus) {
		if (!skus) {
			throw 'There must be at least one valid sku object.';
		}

		_.each(skus, function (sku) {
			if (!sku.idSelector) {
				throw 'There must be an idSelector for every sku.';
			}

			if (!document.getElementById(sku.idSelector)) {
				throw 'The idSelector must evaluate to a DOM element when using document.getElementById.';
			}

			if (!sku.skuId) {
				throw 'There must be a sku value in the skuId field.';
			}

			if (typeof sku.condition !== 'undefined' && !isNaN(sku.condition)) {
				sku.condition = sku.condition.toString();
			}

			// Ensure we have a clean and valid condition type.
			if (!this._isValidConditionType(sku.condition)) {
				this._warn('changed the condition of ' + sku.condition + ' to new');
				sku.condition = 'new';
			}

			sku.skuId = sku.skuId.toString();
		}, this);
	}

	/**
	 * Remove any 'old' data in case they reused the sku object
	 * @param sku
	 * @private
	 */
	_cleanupOldSkuProps (sku) {
		delete sku.instorePickupServiceDisabled;
		delete sku.shippingServiceDisabled;
		delete sku.ispuChangeLinkDisplayText;
		delete sku.location;
		delete sku.zipCode;
		delete sku.storeId;
		delete sku.tierCode;
		delete sku.translationComplete;
		delete sku.serviceResponseData;
		delete sku.shipping;
		delete sku.delivery;
		delete sku.inStorePickup;
		delete sku.shippingServiceDisabled;
		delete sku.ispuServiceOff;
		delete sku.buttonState;
		delete sku.shippingAndDelivery;
	}

	_warn (msg) {
		window.console.warn(msg);
	}

	render () {
		var data = {
			skus: this.skus,
			location: this.location
		};

		if (!this.app) {
			this.app = new App(data);
		} else {
			this.app.updateAvailability(data);
		}
	}
}

export default Fulfillment;

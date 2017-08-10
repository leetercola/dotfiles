export const changeStore = item => async dispatch => StoreAvailability.open({
  skuData: buildChangeStorePayload(item),
  modalType: 'Stores',
  selectStoreCallback: async (storeData) => {
    const lineItems = storeData.map(lineItem => {
      const availabilityType = lineItem.availabilityType
      return {
        id: item.get('id'),
        commerceItemId: item.get('commerceItemId'),
        availableDate: lineItem.maxDate,
        storeFulfillmentType: availabilityType,
        capId: lineItem.capId,
        capCorrelationId: lineItem.capCorrelationId,
        serviceLevel: lineItem.serviceLevel,
        selectedFulfillment: {
          inStorePickup: {
            displayDateType: lineItem.displayDateType,
            fulfillDate: lineItem.fulfillDate,
            isBackOrdered: lineItem.backordered,
            pickupStoreId: lineItem.availability.store.locationId,
            isAvailableAtLocation: availabilityType !== 'ShipToStore',
            isSTSAvailable: availabilityType === 'ShipToStore'
          }
        }
      }
    })

    try {
      await dispatch(call({
        url: '/cart/api/v1/fulfillment/ispu',
        method: 'POST',
        body: { lineItems }
      }))
      StoreAvailability.close()
    } catch (response) {
      StoreAvailability.handleErrors(response.alert || [])
    }
  }
})

const setLocationState = zipcode => ({ type: SET_LOCATION, data: zipcode })

export const setLocation = (zipcode) => async (dispatch, getState) => {
  dispatch(setLocationState(zipcode))
  await userLocationManager.set({ destinationZipCode: zipcode })

  await dispatch(get({ spinner: false }))

  // When the zipcode changes, we need to re-fetch delivery dates
  dispatch(fetchPhoenixData())
}

export const fetchPhoenixData = () => async (dispatch, getState) => {
  getFlattenedItems(getState()).forEach(item => {
    if (showDelivery(item) || hasInstallation(item)) {
      dispatch(getFulfillmentsForItem({
        skuId: item.get('skuId'),
        condition: item.get('condition')
      }))
    }
  })
}

const getFulfillmentsForItem = ({ skuId, condition }) => async (dispatch, getState) => {
  const state = getState()
  const zip = getZipCode(state)
  const cached = state.getIn([ 'fulfillment', getPhoenixToken({ zip, skuId, condition }) ])

  if (cached || !zip) return cached

  dispatch({
    type: SET_FULFILLMENT_DATA,
    payload: Immutable.Map({ status: 'PENDING' }),
    condition,
    skuId,
    zip
  })

  let params = `;skuId=${skuId};showInStore=true;postalCode=${zip};deliveryDateOption=EARLIEST_AVAILABLE_DATE`

  if (condition) {
    params += `;condition=${condition}`
  }

  const response = await window.fetch(`/fulfillment/shipping/api/v1/fulfillment/sku${params}?X-REQUEST-ID=BROWSE&X-CLIENT-ID=BROWSE`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
    }
  })

  const data = Immutable.fromJS(await response.json())

  dispatch({
    type: SET_FULFILLMENT_DATA,
    payload: Immutable.Map({ status: 'COMPLETED', data }),
    condition,
    skuId,
    zip
  })

  return data
}

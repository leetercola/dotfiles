import constants from 'helpers/constants';
import _ from 'lodash';

const initialState = {
  isInit: false,
  user: {
    access: null
  },
  roles: "",
  groups: null,
  pk: null,
  myOrdersPK: null,
  customerDetails: [],
  isCustomerLoaded: false
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.ACCOUNT_USER_SUCCESS:
      return Object.assign({}, state.account, action.payload);
    case constants.ACCOUNT_DETAILS_SUCCESS:
      return Object.assign({}, state.account, action.payload);
    default:
      return state.account;
  }
}

const parseRoles = (accessess, roles) => {
  let _roles = [];
  const roleNotFound = (role, _roleString) => {
    const rolesArray = roleString.split(' | ');
    if(rolesArray.indexOf(role) === -1) {
      return true;
    }
  };

  _.each(accessess, (access) => {
    if(_.isArray(access.roles) && access.roles[0].name) {
      if( !_.isEmpty(roles) && roleNotFound(access.roles[0].name, roles)) {
          _roles.push(access.roles[0].name + " | ");
      }
      else if(_.isEmpty(roles)) {
          _.roles.push(access.roles[0].name + " | ");
      }
    }
  });

  return roles.join();
};

/* ACTION CREATORS */
const getUserRequest = async (userId = false) => {
  const data = {'userId': userId};
  const response = await fetch(
    'api/account/getUser',
    {
      method: 'GET',
      body: data
    });
  return response.json();
};

const getUserSuccess = (data) => {
  return {
    type: constants.ACCOUNT_USER_SUCCESS,
    payload: {
      //roles: parseRoles(data.access), //TODO need to retrieve current state for account.roles
      isInit: true,
      groups: data.groups || [],
      access: data.access || [],
      pk: data.pk || "",
      myOrdersPK: data.externalIdList.myOrdersPK.value
    }
  };
};

const getUserFailed = (error) => {
  return {
    type: constants.ACCOUNT_USER_FAILURE,
    error
  };
};

export const loadAccountDetails = (userId) => async dispatch => {
  try {
    const data = await getUserRequest(userId);
    dispatch(getUserSuccess(data));
  } catch (e) {
    dispatch(getUserFailed(e));
  }
};

const getCustomerDetailsRequest = async (userId) => {
  const data = { customer: userId };
  const response = await fetch(
    'api/account/getCustomerDetails',
    {
      method: 'GET',
      body: data
    }
  );
  return response.json();
};

const getCustomerDetailsSuccess = (data) => ({
  type: constants.ACCOUNT_DETAILS_SUCCESS,
  payload: {
    customerDetails: data
  }
});

const getCustomerDetailsFailed = (error) => ({
  type: constants.ACCOUNT_DETAILS_FAILURE,
  error
});

export const loadCustomerDetails = (userId) => async dispatch => {
  try {
    const data = await getCustomerDetailsRequest(userId);
    dispatch(getCustomerDetailsSuccess(data));
  } catch (e) {
    dispatch(getCustomerDetailsFailed(e));
  }
};

export const reset = () => ({
  type: 'ACCOUNT/DETAILS/RESET',
  payload:{
    isInit: false
  }
});

import React from 'react';
import globalHook from 'use-global-hook';
import * as actions from './actions';

const initialState = {
  // Auth
  isAuthenticated: false,
  authLoadingStatus: 'INITIAL',
  token: null,
  user: null
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;

import React from 'react';
import globalHook from 'use-global-hook';
import * as actions from './actions';

const initialState = {
  message: { content: 'sdfsd', show: false },
  // Auth
  isAuthenticated: false,
  authLoading: false,
  user: null,
  userInfoLoading: false,
  // Avatar
  avatarLoading: false
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;

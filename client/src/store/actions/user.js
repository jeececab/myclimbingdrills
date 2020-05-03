import axios from 'axios';

export async function signup(store, name, email, password) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.post('/users', { name, email, password });
    const { user } = response.data;

    store.setState({
      isAuthenticated: true,
      user,
      authLoading: false
    });

    return 'SUCCESS';
  } catch (e) {
    console.log(e.response.data.error);
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

export async function login(store, email, password) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.post('/users/login', { email, password });
    const { user } = response.data;

    store.setState({
      isAuthenticated: true,
      user,
      authLoading: false
    });

    return 'SUCCESS';
  } catch (e) {
    console.log(e.response.data.error);
    store.actions.ui.showMessage(e.response.data.error)
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

export async function logout(store) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.post('/users/logout');

    store.setState({
      isAuthenticated: false,
      user: null,
      authLoading: false
    });

    return response.status;
  } catch (e) {
    console.log(e.response.data.error);
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

export async function deleteAccount(store, history) {
  store.setState({ authLoading: true });
  try {
    await axios.delete('/users/me');
    store.setState({ user: null, isAuthenticated: false });
    history.push('/');
    store.setState({ authLoading: false });
    setTimeout(() => {
      store.actions.ui.showMessage('Account deleted successfully');
    }, 1000);
  } catch (e) {
    console.log(e.response.data.error);
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

export async function me(store) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.get('/users/me');

    store.setState({
      isAuthenticated: true,
      user: response.data,
      authLoading: false
    });

    return response.status;
  } catch (e) {
    console.log(e.response.data.error);
    store.setState({ authLoading: false });
  }
}

export async function updateUserInfo(store, update) {
  store.setState({ userInfoLoading: true });
  try {
    const response = await axios.patch('/users/me', update);
    const user = response.data;
    store.setState({ userInfoLoading: false });
    store.setState({ user });
    store.actions.ui.showMessage('Changes saved');
    return user;
  } catch (e) {
    console.log(e.response.data.error);
    if (e.response.data.error.includes('password')) {
      store.actions.ui.showMessage(e.response.data.error);
    }
    store.setState({ userInfoLoading: false });
  }
}

export async function uploadAvatar(store, formData) {
  store.setState({ avatarLoading: true });
  try {
    const response = await axios.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    store.setState({ user: { ...store.state.user, avatar: response.data.avatar } });
    store.setState({ avatarLoading: false });
    return response.data.avatar;
  } catch (e) {
    store.setState({ avatarLoading: false });
    console.log(e.response.data.error);
  }
}

export async function deleteAvatar(store) {
  store.setState({ avatarLoading: true });
  try {
    await axios.delete('/users/me/avatar');

    store.setState({ user: { ...store.state.user, avatar: null } });
    store.setState({ avatarLoading: false });
  } catch (e) {
    console.log(e.response.data.error);
    store.setState({ avatarLoading: false });
  }
}

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
    console.log(e.response.data.message);
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
    console.log(e.response.data.message);
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
    console.log(e);
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
    console.log(e.response.data.message);
    store.setState({ authLoading: false });
  }
}

export async function uploadAvatar(store, formData) {
  try {
    const response = await axios.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    store.setState({ user: { ...store.state.user, avatar: response.data.avatar } });
    return response.data.avatar;
  } catch (e) {
    console.log(e.response.data.message);
  }
}

export async function deleteAvatar(store) {
  try {
    await axios.delete('/users/me/avatar');
    store.setState({ user: { ...store.state.user, avatar: null } });
  } catch (e) {
    console.log(e.response.data.message);
  }
}

import axios from 'axios';

export async function login(store, email, password) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.post('/users/login', { email, password });
    const { user, token } = response.data;
    store.setState({
      isAuthenticated: true,
      user,
      token,
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
    const response = await axios.post(
      '/users/logout',
      {},
      { headers: { Authorization: `Bearer ${store.state.token}` } }
    );

    store.setState({
      isAuthenticated: false,
      user: null,
      token: null,
      authLoading: false
    });

    return response.status;
  } catch (e) {
    console.log(e);
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

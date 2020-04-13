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
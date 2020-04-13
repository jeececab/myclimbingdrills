import axios from 'axios';

export async function signup(store, name, email, password) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.post('/users', { name, email, password });
    const { user /* , token  */ } = response.data;

    store.setState({
      isAuthenticated: true,
      user,
      //token,
      authLoading: false
    });

    return 'SUCCESS';
  } catch (e) {
    console.log(e.response.data.message);
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

export async function checkToken(store) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.get('/users/token');
    console.log(response)

    store.setState({ authLoading: false });

    return 'SUCCESS';
  } catch (e) {
    store.setState({ authLoading: false });
    return 'ERROR';
  }
}

export async function login(store, email, password) {
  store.setState({ authLoading: true });

  try {
    const response = await axios.post('/users/login', { email, password });
    const { user /* , token */ } = response.data;

    store.setState({
      isAuthenticated: true,
      user,
      //token,
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
      //token: null,
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

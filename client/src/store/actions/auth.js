import axios from 'axios';

export async function login(store, email, password) {
  store.setState({ authLoadingStatus: 'LOADING' });

  try {
    const response = await axios.post('/users/login', { email, password });
    const { user, token } = response.data;
    store.setState({
      isAuthenticated: true,
      user,
      token,
      authLoadingStatus: 'SUCCESS'
    });

    return 'SUCCESS';
  } catch (e) {
    console.log(e.response.data.message);
    store.setState({ authLoadingStatus: 'ERROR' });
    return 'ERROR';
  }
}

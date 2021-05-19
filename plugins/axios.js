export default ({ $axios, store, redirect }) => {
  const extraPayload = {
    platformId: 1,
  };
  $axios.onRequest((_config) => {
    const config = _config;
    console.log(`Making request to ${config.url}`);

    config.headers.post['Content-Type'] = 'application/json';

    const requestUrl = config.url;
    const splitUrl = requestUrl.split(config.baseURL)[0].split('/');
    if (!splitUrl.includes('upload')) {
      config.transformRequest = (data) => {
        const r = { ...extraPayload, ...data };
        return JSON.stringify(r);
      };
    }
    if (store.state.authenticated && store.state.token != null) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }

    config.transformRequest = (data) => {
      const payload = { ...extraPayload, ...data };
      return JSON.stringify(payload);
    };

    return config;
  });

  $axios.onError((_error) => {
    const error = _error;
    console.log(error, 'error');
    const code = parseInt(error.response && error.response.status, 10);
    if (code === 401) {
      redirect('/login');
    }
  });

  $axios.onResponse((_response) => {
    const response = _response;
    return response.data;
  });
};

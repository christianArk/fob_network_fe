import { state } from '../store';

export default ({ $axios }) => {
  const extraPayload = {
    platformId: 1,
  };
  $axios.onRequest((_config) => {
    const config = _config;

    config.headers.post['Content-Type'] = 'application/json';

    const requestUrl = config.url;
    const splitUrl = requestUrl.split(config.baseURL)[0].split('/');
    if (!splitUrl.includes('upload')) {
      config.transformRequest = (data) => {
        const r = { ...extraPayload, ...data };
        return JSON.stringify(r);
      };
    }

    if (state.authenticated && state.token != null) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }

    config.transformRequest = (data) => {
      const payload = { ...extraPayload, ...data };
      return JSON.stringify(payload);
    };

    return config;
  });
};

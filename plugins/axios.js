export default ({ $axios }) => {
  const extraPayload = {
    platformId: 1,
  };
  $axios.onRequest((_config) => {
    const config = _config;
    config.transformRequest = (data) => {
      const payload = { ...extraPayload, ...data };
      return JSON.stringify(payload);
    };
  });
};

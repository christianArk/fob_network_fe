import {
  LOGIN,
  FORGOT_PASSWORD,
  LOGOUT,
} from '../utils/routes';

export const strict = false;

export const state = () => ({
  authenticated: false,
  user: null,
});

export const actions = {

  login({ commit }, payload) {
    return this.$axios.post(LOGIN, payload).then((res) => {
      commit('SET_AUTH', res.data.user);
      return res;
    }).catch((error) => error);
  },

  logout({ commit }) {
    return this.$axios.post(LOGOUT).then((res) => {
      commit('UNSET_AUTH');
      return res;
    }).catch((error) => error);
  },

  forgotPassword({ commit }, payload) {
    return this.$axios.post(FORGOT_PASSWORD, payload).then((res) => {
      commit('SET_AUTH', res.data.user);
      return res;
    }).catch((error) => error);
  },
};

export const mutations = {
  UNSET_AUTH: (_state) => {
    const mutationState = _state;
    mutationState.authenticated = false;
    mutationState.user = null;
  },
  SET_AUTH: (_state, payload) => {
    const mutationState = _state;
    mutationState.authenticated = true;
    mutationState.user = payload;
  },
  LOGOUT: (_state) => {
    const mutationState = _state;
    mutationState.authenticated = false;
    mutationState.user = null;
  },
};

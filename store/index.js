import {
  LOGIN, FORGOT_PASSWORD, RESET_PASSWORD, LOGOUT, REGISTER,
} from '../utils/routes';

export const strict = false;

export const state = {
  authenticated: false,
  token: null,
  user: null,
};

export const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(LOGIN, payload)
        .then((res) => {
          commit('SET_AUTH', res.data);
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },

  register({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(REGISTER, payload)
        .then((res) => {
          commit('SET_AUTH', res.data);
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },

  logout({ commit }) {
    return this.$axios
      .post(LOGOUT)
      .then((res) => {
        commit('UNSET_AUTH');
        return res;
      })
      .catch((error) => error);
  },

  forgotPassword({ commit }, payload) {
    return this.$axios
      .post(FORGOT_PASSWORD, payload)
      .then((res) => {
        commit('SET_AUTH', res.data.user);
        return res;
      })
      .catch((error) => error);
  },

  resetPassword({ commit }, payload) {
    return this.$axios
      .post(RESET_PASSWORD, payload)
      .then((res) => {
        commit('SET_AUTH', res.data.user);
        return res;
      })
      .catch((error) => error);
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
    mutationState.user = payload.user;
    mutationState.token = payload.token;
  },
  LOGOUT: (_state) => {
    const mutationState = _state;
    mutationState.authenticated = false;
    mutationState.user = null;
  },
};

export const getters = {
  getUser: (_state) => {
    const getterState = _state;
    return getterState.user;
  },
  token: (_state) => {
    const getterState = _state;
    return getterState.token;
  },
  isAuthenticated: (_state) => {
    const getterState = _state;
    return getterState.authenticated;
  },
};

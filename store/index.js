import {
  LOGIN, FORGOT_PASSWORD, RESET_PASSWORD, LOGOUT, REGISTER,
  GET_LOGS,
} from '../utils/routes';

export const strict = false;

export const state = {
  authenticated: false,
  token: null,
  user: null,
};

export const actions = {
  getActivities() {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(GET_LOGS)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  getUsers() {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('user')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  getRoles() {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('rights/roles')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  getRole(context, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`rights/role/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  getUser(context, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`user/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  getPermissions() {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('rights/permissions')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  createUser(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('user', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  createRole(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('rights/role', payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  updateRole(context, { id, payload }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`rights/role/update/${id}`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  updateUser(context, { id, payload }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`user/${id}`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  deleteRole(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`rights/role/${payload}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(LOGIN, payload)
        .then((res) => {
          commit('SET_AUTH', res);
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
          commit('SET_AUTH', res);
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(LOGOUT)
        .then((res) => {
          commit('UNSET_AUTH');
          resolve(res);
        })
        .catch((error) => { reject(error); });
    });
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
    mutationState.token = null;
    mutationState.user = null;
  },
  SET_AUTH: (_state, payload) => {
    const mutationState = _state;
    mutationState.authenticated = true;
    mutationState.user = payload.data;
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

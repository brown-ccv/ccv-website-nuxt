import DataService from '@/services/DataService.js';
export const state = () => ({
  home: []
});
export const mutations = {
  SET_HOME(state, payload) {
    state.home = payload[0];
  }
};
export const actions = {
  fetchData({ commit }) {
    return DataService.getData('home').then((response) => {
      commit('SET_HOME', response.data);
    });
  }
};

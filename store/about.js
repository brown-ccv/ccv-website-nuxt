import DataService from '@/services/DataService.js';
export const state = () => ({
  about: []
});
export const mutations = {
  SET_ABOUT(state, payload) {
    state.about = payload[0];
  }
};
export const actions = {
  fetchData({ commit }) {
    return DataService.getData('about').then((response) => {
      commit('SET_ABOUT', response.data);
    });
  }
};

import DataService from '@/services/DataService.js';
export const state = () => ({
  status: []
});
export const mutations = {
  SET_STATUS(state, payload) {
    state.status = payload;
  }
};
export const actions = {
  fetchData({ commit }) {
    commit('SET_STATUS', 'test');
    return DataService.getData('status').then((response) => {
      commit('SET_STATUS', response.data);
    });
  }
};

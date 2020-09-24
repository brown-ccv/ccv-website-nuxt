export const state = () => ({
  status: []
});
export const mutations = {
  SET_STATUS(state, payload) {
    state.status = payload;
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/status');
    commit('SET_STATUS', data);
  }
};

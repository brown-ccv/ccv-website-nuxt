export const state = () => ({
  data: []
});
export const mutations = {
  SET_STATUS(state, payload) {
    state.data = payload;
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/status');
    commit('SET_STATUS', data);
  }
};

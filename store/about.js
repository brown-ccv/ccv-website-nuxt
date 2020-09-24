export const state = () => ({
  about: []
});
export const mutations = {
  SET_ABOUT(state, payload) {
    state.about = payload[0];
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/about');
    commit('SET_ABOUT', data);
  }
};

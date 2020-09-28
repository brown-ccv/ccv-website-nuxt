export const state = () => ({
  index: null
});
export const mutations = {
  SET_ABOUT(state, payload) {
    state.index = payload;
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/about');
    commit('SET_ABOUT', data.index);
  }
};

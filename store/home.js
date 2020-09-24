export const state = () => ({
  home: []
});
export const mutations = {
  SET_HOME(state, payload) {
    state.home = payload[0];
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/home');
    commit('SET_HOME', data);
  }
};

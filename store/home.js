export const state = () => ({
  data: null,
  index: null
});
export const mutations = {
  SET_HOME(state, payload) {
    state.data = payload.data;
    state.index = payload.index;
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/home');
    commit('SET_HOME', data);
  }
};

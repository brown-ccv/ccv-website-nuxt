export const state = () => ({
  data: []
});
export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload;
  }
};
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/home/banners');
    commit('SET_DATA', data.data);
  }
};

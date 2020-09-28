export const state = () => ({
  data: null,
  index: null
});
export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload.data;
    state.index = payload.index;
  }
};
export const actions = {
  async fetchData({ commit }, params) {
    const path = Object.keys(params)
      .map((k) => `${params[k]}`)
      .join('/');
    const data = await this.$axios.$get(`/${path}`);
    commit('SET_DATA', data);
  }
};

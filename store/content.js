export const state = () => ({
  data: null,
  index: null,
  toc: null,
  single: null
});
export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload.data;
    state.index = payload.index;
    state.toc = payload.toc;
  },
  SET_SINGLE(state, item) {
    const single = state.data.filter((d) => {
      return d.title.replace(/ /g, '-').toLowerCase() === item.toLowerCase();
    });
    state.single = single[0];
  }
};
export const actions = {
  async fetchData({ commit }, params) {
    const path = Object.keys(params)
      .map((k) => `${params[k]}`)
      .join('/');
    const data = await this.$axios.$get(`/${path}`);
    commit('SET_DATA', data);
  },
  setSingle({ commit }, item) {
    return commit('SET_SINGLE', item);
  }
};

export const state = () => ({
  data: null,
  index: null,
  toc: null,
  single: null,
  list: []
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
  },
  SET_LIST(state, payload) {
    state.list = payload;
  }
};
export const actions = {
  async fetchData({ commit }, params) {
    const path = Object.keys(params)
      .map((k) => `${params[k]}`)
      .join('/');
    const data = await this.$axios.$get(`/${path}`);
    commit('SET_DATA', data);
    // If not about and help, fetch data for all items in toc and add to list
    if (
      !['help', 'about'].includes(params.main) &&
      (!params.category || params.category === 'software')
    ) {
      await Promise.all(
        data.toc.map((item) => {
          return this.$axios.$get(`/${path}/${item}`);
        })
      ).then((values) => commit('SET_LIST', values));
    }
  },
  setSingle({ commit }, item) {
    return commit('SET_SINGLE', item);
  }
};

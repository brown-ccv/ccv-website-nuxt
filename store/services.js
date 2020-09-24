export const state = () => ({
  consulting: null,
  infrastructure: null,
  service: null,
  index: null,
  rates: null
});
export const mutations = {
  SET_CONSULTING_SERVICES(state, payload) {
    state.consulting = payload;
  },
  SET_INFRASTRUCTURE_SERVICES(state, payload) {
    state.infrastructure = payload;
  },
  SET_SERVICES_INDEX(state, payload) {
    state.index = payload.filter((a) => a.title === 'Services')[0];
    state.rates = payload.filter((a) => a.title === 'Rates')[0];
  },
  SET_SERVICE(state, item) {
    const service = state.services.filter((service) => {
      return (
        service.title.replace(/ /g, '-').toLowerCase() === item.toLowerCase()
      );
    });
    state.service = service[0];
  }
};
export const actions = {
  async fetchData({ commit }) {
    const consulting = await this.$axios.$get('/services/consulting');
    commit('SET_CONSULTING_SERVICES', consulting);
    const infrastructure = await this.$axios.$get('/services/infrastructure');
    commit('SET_INFRASTRUCTURE_SERVICES', infrastructure);
    const index = await this.$axios.$get('/services');
    commit('SET_SERVICES_INDEX', index);
  },
  setService({ commit }, item) {
    return commit('SET_SERVICE', item);
  }
};

import DataService from '@/services/DataService.js';
export const state = () => ({
  services: [],
  service: {},
  index: {},
  rates: {}
});
export const mutations = {
  SET_SERVICES(state, payload) {
    state.services = payload;
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
  fetchData({ commit }) {
    DataService.getData('services/consulting').then((response) => {
      commit('SET_SERVICES', response.data);
    });
    DataService.getData('services').then((response) => {
      commit('SET_SERVICES_INDEX', response.data);
    });
  },
  setService({ commit }, item) {
    return commit('SET_SERVICE', item);
  }
};

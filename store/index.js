export const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  }
};

export const state = () => ({
  banners: [],
  status: []
});

export const actions = {
  //   async nuxtServerInit({ commit }, { $content }) {
  //     const data = await $content('home', 'banners').fetch();
  //     // TODO: mutate status too!
  //     await commit('mutate', { property: 'banners', with: data });
  //   }
};

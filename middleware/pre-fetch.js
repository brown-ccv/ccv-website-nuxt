export default function({ store }) {
  // If the user is not authenticated
  store.dispatch('status/fetchData');
  store.dispatch('services/fetchData');
}

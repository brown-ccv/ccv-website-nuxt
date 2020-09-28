export default function({ store }) {
  // If the user is not authenticated
  if (store.state.status.data.length === 0) {
    store.dispatch('status/fetchData');
  }
}

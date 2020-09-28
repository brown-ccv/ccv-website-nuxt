export default function({ params, redirect }) {
  if (params.main === 'status') {
    redirect('https://status.ccv.brown.edu');
  }
}

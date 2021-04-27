<template>
  <div class="">
    <DHero
      variant="primary"
      title="Center for Computation & Visualization"
      subtitle="Scientific and technical computing expertise to advance computational research"
      class="is-fullheight"
    >
      <template #button>
        <DButton
          name="Learn about CCV's services"
          variant="dark"
          size="medium"
        />
      </template>
    </DHero>
    <client-only>
      <p>{{ todo.id }}</p>
      {{ todo }}
    </client-only>
  </div>
</template>

<script>
import DButton from '@/components/base/DButton';
import DHero from '@/components/base/DHero';

export default {
  components: { DHero, DButton },
  async fetch() {
    // example to prove out the client-only rendering
    const num = Math.floor(Math.random() * 10);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${num}`
    );
    this.todo = await response.json();
  },
  data() {
    return {
      todo: {}
    };
  }
  // call fetch only on client-side
  // fetchOnServer: false
};
</script>

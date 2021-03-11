<template>
  <div>
    {{ uid }}
  </div>
</template>

<script>
export default {
  layout: 'auth',
  async asyncData(context) {
    const uid = await context.params.uid
    return {
      uid,
    }
  },
  data: () => ({}),
}
</script>

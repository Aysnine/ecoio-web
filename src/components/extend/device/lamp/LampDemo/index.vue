<template lang="pug">
  span topic {{ id }} {{ room }}
</template>

<script>
export default {
  props: ['id', 'room']
}
</script>

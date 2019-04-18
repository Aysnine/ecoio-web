<template lang="pug">
  span hello {{ id }} {{ room }}
</template>

<script>
export default {
  props: ['id', 'room']
}
</script>

<script>
import DragAndDrop from './components/DragAndDrop.vue';

export default {
  components: {
    DragAndDrop,
  },
}
</script>

<template>
<div class="app">
  <div class="app__dragAndDropWrapper">
    <DragAndDrop></DragAndDrop>
  </div>
</div>
</template>

<style scoped>
.app {
  padding: 15px;
}

.app__dragAndDropWrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}
</style>

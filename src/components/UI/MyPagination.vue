<template>
  <div class="page__wrapper">
    <div
        v-for="pageNumber in pages"
        :key="pageNumber"
        class="page"
        :class="{'current-page': pageNumber === currentPage}"
        @click="$emit('change', pageNumber)"
    >
      {{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    pages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
  gap: 5px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  padding: 10px;
  border: 2px solid teal;
}
</style>
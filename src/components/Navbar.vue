<template>
  <div class="navbar">
    <div @click="$router.push('/')">
      <h1>Vue 3</h1>
    </div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/about')">О сайте</MyButton>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
  display: flex;
  gap: 5px;
}
</style>

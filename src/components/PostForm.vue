<template>
  <form @submit.prevent="createPost">
    <h4>Создание поста</h4>

    <MyInput
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"
    />
    <MyInput
        v-model="post.body"
        type="text"
        placeholder="Описание"
    />

    <MyButton
        style="align-self: flex-end;margin-top: 15px"
        type="submit"
    >
      Создать
    </MyButton>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit("create", this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },
  // watch: {
  //   // Глубокое отслеживание объекта post
  //   post: {
  //     handler(newValue) {
  //       console.log(newValue)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput
        v-focus
        v-model="searchQuery"
        placeholder="Поиск по названию..."
    />

    <div class="btns">
      <MyButton> Создать пост</MyButton>

      <MySelect v-model="selectedSort" :options="sortOptions"/>
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm/>
    </MyDialog>

    <PostList
        :posts="sortedAndSearchedPosts"
        v-if="!isLoading"
    />

    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSearchedPosts from "@/hooks/useSearchedPosts";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По содержанию"},
      ],
    };
  },
  setup(props) {
    const {posts, totalPages, isLoading} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSearchedPosts(sortedPosts)

    return {
      posts, totalPages, isLoading,
      sortedPosts, selectedSort,
      searchQuery, sortedAndSearchedPosts
    }
  }
};
</script>

<style>
.btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>

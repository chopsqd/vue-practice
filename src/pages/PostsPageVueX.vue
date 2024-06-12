<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput
        v-focus
        :model-value="searchQuery"
        @update:model="setSearchQuery"
        placeholder="Поиск по названию..."
    />

    <div class="btns">
      <MyButton @click="showDialog">Создать пост</MyButton>

      <MySelect
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>

    <PostList
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isLoading"
    />

    <div v-else>Загрузка...</div>

    <div v-intersection="loadMorePosts" class="observer"/>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isLoading: state => state.post.isLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.posts,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
    // sortedPosts() {
    //   return [...this.posts].sort((p1, p2) =>
    //       p1[this.selectedSort]?.localeCompare(p2[this.selectedSort])
    //   );
    // },
    // sortedAndSearchedPosts() {
    //   return this.sortedPosts.filter((post) =>
    //       post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    //   );
    // },
    //
    // Код выше перенесен в VueX
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
};
</script>

<style>
.btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  border: 1px dashed #ccc;
}
</style>

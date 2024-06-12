<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput
        v-focus
        v-model="searchQuery"
        placeholder="Поиск по названию..."
    />

    <div class="btns">
      <MyButton @click="showDialog"> Создать пост </MyButton>

      <MySelect v-model="selectedSort" :options="sortOptions" />
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

<!--    <div ref="observer" class="observer"/>-->

    <div v-intersection="loadMorePosts" class="observer"/>

    <!--    <MyPagination-->
    <!--        :current-page="page"-->
    <!--        :pages="totalPages"-->
    <!--        @change="changePage"-->
    <!--    />-->
  </div>
</template>

<script>
import axios from "axios";
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
        );
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = response.data;
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
        );
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert(error);
      }
    }
  },
  mounted() {
    this.fetchPosts();
    // let options = {
    //   rootMargin: '',
    //   threshold: 1
    // }
    //
    // const callback = entries => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // }
    //
    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
    //
    // Код выше перенесли в директиву v-intersection
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1, p2) =>
          p1[this.selectedSort]?.localeCompare(p2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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

import axios from "axios";
import {onMounted, ref} from "vue";

export default function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isLoading = ref(true)

    const fetching = async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    params: {
                        _page: 1,
                        _limit: limit,
                    },
                }
            );
            totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
            posts.value = response.data;
        } catch (error) {
            alert(error);
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        posts, totalPages, isLoading
    }
}
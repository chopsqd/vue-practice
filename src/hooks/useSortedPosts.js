import {computed, ref} from "vue";

export default function useSortedPosts(posts) {
    const selectedSort = ref('')

    const sortedPosts = computed(() => {
        return [...posts.value].sort((p1, p2) =>
            p1[selectedSort.value]?.localeCompare(p2[selectedSort.value])
        );
    })

    return {
        selectedSort, sortedPosts
    }
}
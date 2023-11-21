import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouterStore = defineStore('router', () => {
    const selectedTabIndex = ref(0)
    return { selectedTabIndex }
})
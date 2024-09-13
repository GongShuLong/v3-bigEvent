import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
      console.log(token.value)
    }
    return {
      token,
      setToken
    }
  },
  {
    persist: true
  }
)

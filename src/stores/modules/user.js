import { userInfoServiec } from '@/api/user'
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
    const user = ref({})
    const getUser = async () => {
      const res = await userInfoServiec()
      user.value = res.data.data
    }
    const setUser = (newUser) => {
      user.value = newUser
    }
    return {
      token,
      setToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)

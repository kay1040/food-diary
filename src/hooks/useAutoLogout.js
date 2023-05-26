import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const useAutoLogout = () => {
  const auth = useAuthStore()

  onMounted(() => {
    const timeout = auth.expirationTime - Date.now()

    if (timeout < 1000 * 60) {
      auth.logout()
      return
    }

    const timer = setTimeout(() => {
      auth.logout()
    }, timeout)

    onUnmounted(() => {
      clearTimeout(timer)
    })
  })
}

export default useAutoLogout

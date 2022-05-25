<script setup>
import { onMounted, computed } from 'vue'
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter()

// kebutuhan untuk mengakses store user
const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

onMounted(() => {
  userStore.fetchUser()
})

function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('token_type')
  router.push('/login')
}

</script>

<template>
  <nav>
    <ul class="flex flex-col mt-4 bg-slate-500 md:flex-row   md:space-x-8 md:mt-0 md:text-sm md:font-regular">
      <li>
        <RouterLink to="/" class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:text-slate-200"
          aria-current="page">Home
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/absence" class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:text-slate-200">
          Absence</RouterLink>
      </li>
      <li v-if="userStore">
        <button @click="logout" class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:text-slate-200">
          Logout</button>
      </li>
    </ul>
  </nav>
</template>
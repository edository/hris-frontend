<script setup>
import { onMounted, computed } from 'vue'
import { RouterLink } from "vue-router";
import { useRouter } from 'vue-router';

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
    <ul class="flex flex-col mt-4 bg-slate-500 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-regular">
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

  <!-- Hero section start -->
  <section id="hero" class="pb-16 pt-36 bg-slate-100">
    <div class="container">
      <div class="w-full px-4">
        <div class="max-w-xl mx-auto mb-16 text-center">
          <h2 class="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-black">HRIS Web v1.0</h2>
          <p class="font-medium text-md text-secondary md:text-md">HRIS web v.10 sementara digunakan untuk mendapatkan
            rincian informasi mengenai absensi bulanan berdasarkan period/bulan yang dipilih.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Hero section end -->
</template>

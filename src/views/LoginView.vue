<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const router = useRouter()

const form = ref({
  email: "",
  password: "",
  privatetoken: "$2y$10$rjuAbnEnljUXTZ7ZfvFQzOo71DrHdPjBV9kq8yHSzEAcG/YzSRkUS"
})

async function login() {
  try {
    const response = await axios.post("http://192.168.1.14/hris-api/api/login", {
      email: form.value.email,
      password: form.value.password,
      privatetoken: form.value.privatetoken
    });
    // console.log(response.data);

    localStorage.setItem('access_token', response.data.token)
    localStorage.setItem('token_type', 'Bearer')

    userStore.fetchUser()
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
      <h1 class="text-3xl font-semibold text-center text-purple-700">HRIS || e-Absence</h1>

      <form class="mt-6">
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input v-model="form.email" type="email" id="email" name="email"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800">Password</label>
            <input @keyup.enter="login" v-model="form.password" type="password" id="password" name="password"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
          </div>
          <div class="mt-6">
            <button @click="login" type="button"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

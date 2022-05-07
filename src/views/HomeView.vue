<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <ul class="flex flex-col mt-4 bg-black md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-regular">
      <li>
        <RouterLink to="/"
          class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          aria-current="page">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/absence"
          class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Absence</RouterLink>
      </li>
      <li>
        <RouterLink to="/login"
          class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Login</RouterLink>
      </li>
    </ul>
  </nav>
</template>

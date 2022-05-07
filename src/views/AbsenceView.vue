<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter()

// kebutuhan untuk mengakses store user
const userStore = useUserStore()
const user = computed(() => userStore.user)
const isLoggedIn = computed(() => userStore.isLoggedIn)

onMounted(() => {
  userStore.fetchUser()
})

// kebutuhan post absence
// const form = ref({
//   param1: ""
// })

// lookup period
const selected = ref('')
const periodlist = ref([])

async function getPeriodList() {
  try {
    const response = await axios.get("http://192.168.1.14/hris-api/api/lookupperiod");
    periodlist.value = response.data.data
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}




const token = localStorage.getItem('access_token')

const dataAbsence = ref([])

async function getData() {
  try {
    const response = await axios.post("http://192.168.1.14/hris-api/api/absence", {
      param1: selected.value
      // param1: form.value.param1
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    dataAbsence.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}



onMounted(() => {
  getPeriodList()
})

</script>




<template>
  <div class="container">
    <h1>Absence</h1>
    <div class="flex flex-row p-10 mx-auto">
      <form>
        <div class="mb-4">
          <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option v-for="period in periodlist" :value="period.PeriodID">
              {{ period.Desc }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="mb-1" for="period">Period</label>
          <input placeholder="Masukkan period" id="period" type="text" name="period"
            class="w-full py-3 mt-2 border border-gray-300 rounded-full shadow-sm px-7 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100" />
        </div>
        <div class="mb-4">
          <label class="mb-1" for="empid">Emp ID</label>
          <input placeholder="Masukkan Emp ID" id="empid" type="text" name="empid"
            class="w-full py-3 mt-2 border border-gray-300 rounded-full shadow-sm px-7 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100" />
        </div>
        <div class="mt-6">
          <button @click="getData" type="button"
            class="inline-flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full hover:bg-indigo-700 md:py-2 md:text-lg md:px-10 hover:shadow">Get
            Data</button>
        </div>
      </form>
    </div>
    <div v-if="dataAbsence" class="mt-4" v-for="absence in dataAbsence" :key="absence.IDNo">
      {{ absence.Name }} - {{ absence.Day }} - {{ absence.Date }} - {{ absence.AIn }} - {{ absence.AOut }}
      <hr>
    </div>
    <div v-else>
      Data tidak ada
    </div>
  </div>
</template>

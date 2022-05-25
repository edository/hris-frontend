<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';
import axios from 'axios';
import moment from 'moment';

import Navbar from '@/components/layouts/Navbar.vue'

const router = useRouter()

// kebutuhan untuk mengakses store user
const userStore = useUserStore()
const user = computed(() => userStore.user)
const isLoggedIn = computed(() => userStore.isLoggedIn)

onMounted(() => {
  userStore.fetchUser()
})

// lookup period
const selected = ref('')
const periodlist = ref([])

async function getPeriodList() {
  try {
    const response = await axios.get("http://192.168.1.14/hris-api/api/lookupperiod");
    periodlist.value = response.data.data
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
  <Navbar />

  <!-- Absence section start -->
  <section id="absence" class="pb-32 pt-36 bg-slate-100">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="w-full px-4 mb-10 lg:w-1/2">
          <h4 class="mb-3 text-lg font-bold uppercase text-primary">Absence Data</h4>
          <p class="max-w-xl text-base font-medium text-secondary lg:text-lg">Silahkan pilih periode absen yang
            diinginkan.</p>
        </div>
        <div class="w-full px-4 lg:w-1/2">
          <form>
            <label class="mb-1" for="period">Period</label>
            <select v-model="selected"
              class="w-full py-3 mt-2 mb-1 border border-gray-300 rounded-full shadow-sm px-7 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100">
              <option disabled value="">Pilih Period</option>
              <option v-for=" period in periodlist" :value="period.PeriodID">
                {{ period.Desc }}
              </option>
            </select>
            <div class="mt-3">
              <button @click="getData" type="button"
                class="inline-flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-colors duration-200 transform border border-transparent rounded-full bg-slate-600 hover:bg-slate-500 md:py-2 md:text-lg md:px-10 hover:shadow focus:outline-none focus:bg-slate-500">Get
                Data</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <!-- Absence section end -->

  <!-- Absence Result section start -->
  <section id="contact" class="pb-32 pt-12">
    <div class="container">

      <div class="w-full mx-auto lg:w-2/3">
        <div class="table w-full border-collapse">
          <div class="table-header-group border-b-2 border-gray-400 group">
            <div class="table-row">
              <div class="table-cell text-left">Hari</div>
              <div class="table-cell text-left ">Tanggal</div>
              <div class="table-cell text-left ">Absen Masuk</div>
              <div class="table-cell text-left ">Absen Keluar</div>
            </div>
          </div>
          <div class="table-row-group">
            <div class="table-row" v-if="dataAbsence" v-for="absence in dataAbsence" :key="absence.IDNo">
              <div class="table-cell ">{{ absence.Day }}</div>
              <div class="table-cell ">{{ moment(absence.Date).format('DD/MM/YYYY') }}</div>
              <div class="table-cell ">{{ moment(absence.AIn).format('HH:mm') }}</div>
              <div class="table-cell ">{{ moment(absence.AOut).format('HH:mm') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Absence Result section end -->
</template>

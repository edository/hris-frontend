import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: false,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== false,
    getUser: (state) => state.user,
  },
  actions: {
    async fetchUser() {
      try {
        const data = await axios.get("http://192.168.1.14/hris-api/api/profile", {
          headers: {
            Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("access_token"),
          },
        });
        this.user = data.data;
      } catch (error) {
        this.user = false;
      }
    },
  },
});

import { defineStore } from "pinia";
import pinia from "@/store";
import { userLogin, refreshUserInfo } from "@/api/user";
import router from "@/router/router";
export interface UserState {
  username: string;
  accessToken: string;
  refreshToken?: string;
  roles: Array<string>;
}
export const useUserStoreHook = defineStore("userInfo", {
  state: (): UserState => ({
    username: "thl",
    accessToken: "",
    roles: ["common"],
  }),
  getters: {},
  actions: {
    // 存储用户信息
    storeUserLogin(data) {
      return userLogin(data).then((res) => {
        this.username = res.username;
        this.roles = res.roles;
        this.accessToken = res.accessToken;
        return res;
      });
    },
    logout() {
      sessionStorage.removeItem("userInfo");
      this.accessToken = "";
      router.push("/login");
    },
    stroeRefreshUserInfo() {
      if (this.username == "thl" && this.accessToken != "") {
        refreshUserInfo({
          accessToken: this.accessToken,
        })
          .then((res) => {
            this.username = res.username;
            this.roles = res.roles;
            this.accessToken = res.accessToken;
          })
          .catch(() => {
            this.accessToken = "";
          });
      }
    },
  },
  persist: {
    key: "userInfo",
    storage: sessionStorage,
    paths: ["accessToken"],
  },
});
export function useUserStore() {
  return useUserStoreHook(pinia);
}

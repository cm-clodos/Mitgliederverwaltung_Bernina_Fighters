import axios from "axios";
import useUserStore from "@/stores/user";

axios.interceptors.request.use((request, config) => {
  const userStore = useUserStore();
  request.headers.Authorization = userStore.getReqHeaderToken;
  return request;
});

export default axios;

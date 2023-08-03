import axios from "axios";

const baseURL = "http://" + process.env.VUE_APP_SERVER_HOSTNAME;
const basePORT = process.env.VUE_APP_SERVER_PORT;
export default axios.create({
    baseURL: baseURL + ":" + basePORT,
});
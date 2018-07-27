import axios from "axios";

const base_url = () => axios.defaults.baseURL = 'http://api.afl.lan/admin';

export default base_url;

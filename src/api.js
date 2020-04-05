import axios from "axios";

const BASE_URL = "https://toilet-paper-app.herokuapp.com";
// const BASE_URL = "http://localhost:5000";

export async function query() {
  const response = await axios.get(`${BASE_URL}/v0/query`);
  return response.data;
}

export async function submit(data) {
  const response = await axios.post(`${BASE_URL}/v0/update`, data);
  return response.data;
}

export async function ip() {
  const response = await axios.get(
    "https://ipinfo.io/json?token=737774ee26668f"
  );
  return response.data;
}

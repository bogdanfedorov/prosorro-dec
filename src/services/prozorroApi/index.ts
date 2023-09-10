import axios from "axios";

export default axios.create({
  baseURL: "https://prozorro.gov.ua",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    SameSite: "Lax",
  },
});

import axios from "axios";

export const signup = (body) => {
  // package.json dosyasına proxy ayarları sonucu sadece api adreslerini yazabiliyoruz
  return axios.post("/api/1.0/users", body);
};

export const login = (creds) => {
  return axios.post("/api/1.0/auth", {}, { auth: creds });
};

export const changeLanguage = (language) => {
  axios.defaults.headers["Accept-Language"] = language;
};

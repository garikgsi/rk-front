const isDevelop = false;

export default {
  apiUrl: isDevelop
    ? "http://laravel.test/api/v1"
    : "https://api.tcu.su/api/v1",
  appUrl: isDevelop ? "http://localhost:8080" : "https://rk.tcu.su",
};

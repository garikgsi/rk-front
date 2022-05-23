const isDevelop = true;

export default {
  apiUrl: isDevelop
    ? "http://laravel.test/api/v1"
    : "https://api.tcu.su/api/v1",
};

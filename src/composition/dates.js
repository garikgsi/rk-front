import moment from "moment";
import { ref } from "vue";

// user date format
const userFormat = ref("DD.MM.YYYY");
// db date format
const dbFormat = ref("YYYY-MM-DD");

// convert db -> user date format
const dateUserFormat = (date) => {
  return moment(date, dbFormat.value).format(userFormat.value);
};
// convert user -> db date format
const dateDbFormat = (date) => {
  return moment(date, userFormat.value).format(dbFormat.value);
};

export { dateUserFormat, dateDbFormat };

import moment from "moment";
import { ref } from "vue";

// user date format
const userFormat = ref("DD.MM.YYYY");
// db date format
const dbFormat = ref("YYYY-MM-DD");

// convert db -> user date format
const dateUserFormat = (date) => {
  try {
    return moment(date, dbFormat.value).format(userFormat.value);
  } catch (error) {
    return null;
  }
};
// convert user -> db date format
const dateDbFormat = (date) => {
  try {
    return moment(date, userFormat.value).format(dbFormat.value);
  } catch (error) {
    console.log(`wrong date`);
    return null;
  }
};

export { dateUserFormat, dateDbFormat };

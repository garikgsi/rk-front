<template>
  <app-dashboard-widget
    title="Дни рождения в этом месяце"
    :color="color"
    icon="cake"
  >
    <q-date
      class="birthday-calendar"
      v-model="date"
      @navigation="switchMonthYear"
      :events="events.dates"
      event-color="red"
      minimal
    />
    <template v-slot:buttons>
      <div v-if="events.birthdays[`${year}/${month}`]">
        <q-chip
          v-for="kid in events.birthdays[`${year}/${month}`]"
          :key="kid.id"
          :color="color"
          text-color="white"
          icon="cake"
        >
          {{ kid.day }} - {{ kid.fio }}
        </q-chip>
      </div>
      <div v-else>
        <q-chip color="grey-6" text-color="white" icon="sentiment_dissatisfied">
          В этом месяце нет дней рождений
        </q-chip>
      </div>
    </template>
  </app-dashboard-widget>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import moment from "moment";

import AppDashboardWidget from "@/views/AppSkeleton/AppDashboardWidget.vue";
export default {
  setup() {
    const { kidsItems, fetchKidsData } = kidsRepository();
    const color = "accent";

    // we have to fetch kids before use widget
    onMounted(() => {
      fetchKidsData();
    });

    // default date is today
    let date = ref(moment().format("YYYY/MM/DD"));
    // default year is current
    const year = ref(moment().format("YYYY"));
    // default month is current
    const month = ref(moment().format("MM"));

    // kids with birthdays
    const kidsBirthdays = computed(() => {
      return [...kidsItems.value].filter((kid) => kid.birthday !== null);
    });

    // event - for use in calendar
    const events = computed(() => {
      const events = [];
      const kidsWithBirthdays = {};

      [...kidsBirthdays.value].forEach((kid) => {
        const kidBirthday = moment(kid.birthday)
          .format("YYYY-MM-DD")
          .split("-");
        const bMonth = kidBirthday[1];
        const bDay = kidBirthday[2];
        const formattedBirthday = `${year.value}/${bMonth}`;
        const formattedEvent = `${year.value}/${bMonth}/${bDay}`;
        events.push(formattedEvent);

        const formattedKid = {
          fio: kid.fio,
          day: moment(kid.birthday).format(`DD`),
        };
        if (kidsWithBirthdays[formattedBirthday]) {
          kidsWithBirthdays[formattedBirthday].push(formattedKid);
        } else {
          kidsWithBirthdays[formattedBirthday] = [formattedKid];
        }
      });
      return {
        dates: events,
        birthdays: kidsWithBirthdays,
      };
    });

    // we should show birthdays on every year
    const switchMonthYear = ({ year: newYear, month: newMonth }) => {
      year.value = newYear;
      month.value = newMonth < 10 ? `0${newMonth}` : `${newMonth}`;
    };

    return {
      date,
      year,
      month,
      events,
      color,
      switchMonthYear,
    };
  },
  components: {
    "app-dashboard-widget": AppDashboardWidget,
  },
};
</script>

<style lang="scss" scoped>
.birthday-calendar {
  width: 100%;
}
</style>

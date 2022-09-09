<template>
  <div class="row">
    <div class="col-xs-12 q-px-sm q-ma-sm">
      <h1 class="text-primary text-h3">Родительский комитет</h1>
      <p class="subtitle1">
        Онлайн-сервис контроля своевременного внесения оплаты в родительский
        комитет и прозрачные отчеты по тратам для родителей учащихся.
      </p>
      <h2 class="text-primary text-h4">Основные возможности сервиса</h2>
      <div class="row">
        <div
          class="col-xs-12 col-sm-12 col-md-6 col-lg-3 q-pa-sm"
          v-for="slide in slides"
          :key="slide.img"
        >
          <q-img
            :src="slide.img"
            style="height: 350px; max-width: 400px"
            fit="contain"
          >
            <div
              class="absolute-top text-center text-h5 bg-primary"
              style="opacity: 0.8"
            >
              {{ slide.title }}
            </div>
            <div
              class="absolute-bottom text-subtitle1 text-center bg-primary"
              style="opacity: 0.8"
            >
              {{ slide.subTitle }}
            </div>
          </q-img>
        </div>
      </div>

      <h2 class="text-primary text-h4">Для кого этот сервис</h2>
      <p class="subtitle2">
        Сервис предлагает простой инструмент для учета взносов и контроля трат,
        поэтому будет интересен всем участникам процесса
      </p>
      <h2 class="text-primary text-h4">Как пользоваться сервисом</h2>
      <p class="subtitle2">
        В целях безопасности в сервисе предусмотрено разделение прав доступа:
        администраторы и обычные пользователи. Администраторы могут добавлять
        приходные и расходные операции, осуществлять планирование и т.д.
      </p>
      <p class="subtitle2">
        Обычные пользователи могут управлять своим профилем и просматривать
        созданные администратором записи. Для тех, кто не желает
        регистрироваться существует возможность просмотреть публичную часть
        отчета, которая доступна по ссылке в режиме он-лайн. Ссылку к отчету
        может предоставить любой зарегистрированный пользователь или
        администратор.
      </p>
      <h2 class="text-primary text-h4">Как попробовать сервис "на вкус"?</h2>
      <p class="subtitle2">
        Пример публичного отчета доступен по
        <a target="_blank" href="/demo-school-587-for-example">ссылке</a>
      </p>
      <p class="subtitle2">
        Работу интерфейса можно посмотреть на демо-версии без регистрации,
        используя логин <span class="text-bold">demo@example.com</span> и пароль
        <span class="text-bold">password</span>
      </p>
      <h2 class="text-primary text-h4">Как зарегистрироваться</h2>
      <p class="subtitle2">
        В настоящий момент сервис закрыт для публичной регистрации, для
        регистрации необходимо приглашение от уже зарегистрированного
        администратора.
      </p>
    </div>
  </div>
</template>

<script>
import { useMeta } from "quasar";
import { ref } from "vue";
export default {
  name: "home-view",
  setup() {
    useMeta(() => {
      return {
        title: `Родительский комитет: сервис учета взносов и контроля трат`,
        meta: {
          description: {
            name: "description",
            content:
              "Онлайн-сервис для родительского комитета: учет взносов, контроль трат и доступный в реальном времени публичный отчет",
          },
          keywords: {
            name: "keywords",
            content: "Родительский комитет, расходы, учет, отчет",
          },
          equiv: {
            "http-equiv": "Content-Type",
            content: "text/html; charset=UTF-8",
          },
        },
      };
    });

    const slides = ref([
      {
        img: "/widgets.png",
        title: "Удобные виджеты",
        subTitle: "вся информация на одном экране",
      },
      {
        img: "/debt-report.png",
        title: "Отчеты по долгам",
        subTitle: "долги формируются с учетом выбывших и вновь прибывших детей",
      },
      {
        img: "/public-report.png",
        title: "Публичные отчеты",
        subTitle:
          "доступны в режим онлайн и не содержат персональной информации",
      },
      {
        img: "/kid-parent-info.png",
        title: "Дополнительная информация",
        subTitle:
          "все под рукой: дни рождения детей, финансы и контакты родителей",
      },
    ]);
    return {
      slides,
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>

<style lang="scss">
.slide-text {
  // background-color: grey;
  opacity: 0.8;
  color: white;
  padding: 10px;
}
</style>

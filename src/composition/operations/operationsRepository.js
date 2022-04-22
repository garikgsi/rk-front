import { ref, computed } from "vue";
import moment from "moment";
// import { apiGet } from "@/composition/requestApi";
// import { addError } from "../addMessage";
export default function operationsRepository() {
  let loading = ref(false);

  let items = ref([
    {
      id: 1,
      date_operation: "2022-01-23",
      plan_id: "2",
      amount: 4750,
      comment: "пакеты подарочные",
      image: null,
    },
    {
      id: 2,
      date_operation: "2022-02-01",
      plan_id: "1",
      amount: 256,
      comment: "зеленка",
      image: null,
    },
    {
      id: 3,
      date_operation: "2022-02-11",
      plan_id: "3",
      amount: 1522,
      comment: "бейджики",
      image: null,
    },
    {
      id: 4,
      date_operation: "2022-02-15",
      plan_id: "5",
      amount: 2254,
      comment: "4 бутыли воды в класс",
      image: null,
    },
    {
      id: 5,
      date_operation: "2022-02-18",
      plan_id: "1",
      amount: 522,
      comment: "салфетки влажные",
      image: null,
    },
    {
      id: 6,
      date_operation: "2022-02-23",
      plan_id: "1",
      amount: 866,
      comment: "мыло для рук",
      image: null,
    },
    {
      id: 7,
      date_operation: "2022-02-28",
      plan_id: "6",
      amount: 3333,
      comment: "подарок на посвящение в первоклассники",
      image: null,
    },
    {
      id: 8,
      date_operation: "2022-03-01",
      plan_id: "5",
      amount: 4200,
      comment:
        "Набор для изготовления мыла 'Мыльная мастерская. Форсаж', с формочками (23 февраля)",
      image: null,
    },
    {
      id: 9,
      date_operation: "2022-03-05",
      plan_id: "3",
      amount: 2000,
      comment: "подарки учителям (совместно с парал классами) на НГ",
      image: null,
    },
    {
      id: 10,
      date_operation: "2022-03-07",
      plan_id: "2",
      amount: 5440,
      comment: "учебные пособия (3,4 части)  32 компл + доставка",
      image: null,
    },
    {
      id: 11,
      date_operation: "2022-03-10",
      plan_id: "2",
      amount: 5440,
      comment: "учебные пособия (1,2 части) 32 компл + доставка",
      image: null,
    },
  ]);
  // pagination table model
  const pagination = ref({
    sortBy: "date_operation",
    descending: true,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });
  const columns = [
    {
      name: "date_operation",
      field: "date_operation",
      label: "Дата",
      sortable: true,
      align: "left",
      format: (val) => moment(val, "YYYY-MM-DD").format("DD.MM.YYYY"),
      sortOrder: "ad",
    },
    // {
    //   name: "title",
    //   field: "title",
    //   label: "Наименование",
    //   sortable: false,
    //   align: "left",
    // },
    {
      name: "plan_id",
      field: "plan_id",
      label: "Статья расходов",
      sortable: true,
      align: "left",
    },
    // {
    //   name: "price",
    //   field: "price",
    //   label: "Цена",
    //   align: "right",
    //   sortable: false,
    // },
    // {
    //   name: "quantity",
    //   field: "quantity",
    //   label: "Количество",
    //   align: "right",
    //   sortable: false,
    // },
    {
      name: "amount",
      field: "amount",
      label: "Сумма",
      align: "right",
      sortable: false,
    },
    {
      name: "comment",
      field: "comment",
      label: "Комментарий",
      align: "left",
      sortable: false,
    },
    {
      name: "image",
      field: "image",
      label: "Чек/накладная",
      align: "right",
      sortable: false,
    },
    {
      name: "actions",
      field: "actions",
      label: "",
      align: "right",
      sortable: false,
    },
  ];

  // fetch data
  const getData = async (props) => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    // update pagination
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    loading.value = true;
    // fetch new data
    // const { isError, error, data, count } = await apiGet({
    //   url: "operations",
    //   params: {
    //     page: pagination.value.page,
    //     limit: pagination.value.rowsPerPage,
    //   },
    // });
    // if (isError) {
    //   addError(error ? error : "Неизвестная ошибка загрузки расходных операций");
    // }
    // if (data) tokens.value = data;
    // pagination.value.rowsNumber = count;
    loading.value = false;
  };

  // calc itog amount
  const totalAmount = computed(() => {
    return [...items.value].reduce((acc, row) => {
      return acc + row.amount;
    }, 0);
  });

  // find operation by id
  const findOperation = async (id) => {
    loading.value = true;
    loading.value = false;
    const res = [...items.value].find((item) => item.id == id);
    return res;
  };

  // edit row
  const editOperation = async ({ id, data: data }) => {
    loading.value = true;
    loading.value = false;
    return console.log(`row ${id} edited with data=${data}`);
  };
  // insert row
  const addOperation = async ({ data: data }) => {
    loading.value = true;
    loading.value = false;
    return console.log(`row added with data=${data}`);
  };
  // remove row
  const removeOperation = async ({ id }) => {
    loading.value = true;
    loading.value = false;
    return console.log(`row ${id} removed`);
  };

  return {
    items,
    pagination,
    columns,
    totalAmount,
    getData,
    findOperation,
    editOperation,
    addOperation,
    removeOperation,
  };
}

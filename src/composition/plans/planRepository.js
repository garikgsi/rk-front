import { ref, computed } from "vue";
// import { apiGet } from "@/composition/requestApi";
// import { addError } from "../addMessage";
export default function planRepository() {
  let loading = ref(false);

  let items = ref([
    {
      id: 1,
      title: "Вода для кулера",
      price: 475,
      quantity: 10,
      amount: 4750,
    },
    {
      id: 2,
      title: "Краска для принтера",
      price: 2000,
      quantity: 1,
      amount: 2000,
    },
    { id: 3, title: "Ср-ва гигиены", price: 1000, quantity: 1, amount: 2000 },
    {
      id: 4,
      title: "Посвящение в первоклашки",
      price: 150,
      quantity: 31,
      amount: 4650,
    },
    {
      id: 5,
      title: "Прощание с букварем",
      price: 150,
      quantity: 31,
      amount: 4650,
    },
    {
      id: 6,
      title: "Новый год (НЮ)",
      price: 2000,
      quantity: 1,
      amount: 2000,
    },
    {
      id: 7,
      title: "Новый год (учителя)",
      price: 2000,
      quantity: 1,
      amount: 2000,
    },
  ]);
  // pagination table model
  const pagination = ref({
    sortBy: "title",
    descending: false,
    page: 1,
    rowsPerPage: 100,
    rowsNumber: 0,
  });

  const columns = [
    {
      name: "title",
      field: "title",
      label: "Статья расходов",
      sortable: false,
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
    //   url: "plannings",
    //   params: {
    //     page: pagination.value.page,
    //     limit: pagination.value.rowsPerPage,
    //   },
    // });
    // if (isError) {
    //   addError(error ? error : "Неизвестная ошибка загрузки списка запланированных расходов");
    // }
    // if (data) tokens.value = data;
    // pagination.value.rowsNumber = count;
    loading.value = false;
  };

  // simple fetch table data
  const fetchTableData = () => {
    return getData({ pagination: pagination.value });
  };

  // simple fetch select data
  const fetchSelectData = () => {
    return getData({
      pagination: { ...pagination.value, ...{ rowsPerPage: 0 } },
    });
  };

  // calc itog amount
  const totalAmount = computed(() => {
    return [...items.value].reduce((acc, row) => {
      return acc + row.amount;
    }, 0);
  });

  // find plan by id
  const findPlan = async (id) => {
    loading.value = true;
    loading.value = false;
    const res = [...items.value].find((item) => item.id == id);
    return res;
  };

  // edit row
  const editPlan = async ({ id, data: data }) => {
    loading.value = true;
    loading.value = false;
    return console.log(`row ${id} edited with data=${data}`);
  };
  // insert row
  const addPlan = async ({ data: data }) => {
    loading.value = true;
    loading.value = false;
    return console.log(`row added with data=${data}`);
  };
  // remove row
  const removePlan = async ({ id }) => {
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
    findPlan,
    editPlan,
    addPlan,
    removePlan,
    fetchTableData,
    fetchSelectData,
  };
}

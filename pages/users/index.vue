<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['login']
})

let tableHeader = ref([
  { field: "First_Name", title: "First Name", sortable: false, arrange: false },
  { field: "Last_Name", title: "Last Name", sortable: false, arrange: false },
  { field: "Role", title: "Role", sortable: false, arrange: false },
  { field: "status", title: "status", sortable: false, arrange: false },
  { field: "phone", title: "phone", sortable: false, arrange: false },
  { field: "Email", title: "Email", sortable: false, arrange: false },
  { field: "created", title: "created", sortable: false, arrange: false },
]);
const crudLink = "/users";

let users = ref(null);
let paginationData = ref(null);

const selectedItem = ref([]);
const noOfSelected = ref(0);

const result = ref([
  {
    metaData: [
      {
        totalDocuments: 14,
        page: 1,
        perPage: "5",
      },
    ],
    data: [
      {
        _id: "1",
        First_Name: "Rol1 Module ",
        Last_Name: "Rol1 Module ",
        Role: "rol1-module",
        status: "Active",
        phone: "019237540",
        email: "asdfmail.com",
        createdAt: "2024-04-29T06:52:30.664Z",
      },
    ],
  },
]);

users.value = result.value[0]["data"];
paginationData.value = result.value[0]["metaData"];

const sorting = async (dt) => {
  console.log(dt);
};

async function submitDeleteEmit(dt) {
  console.log(dt);
}

const selectAll = (boolean) => {
  let selection = {};
  users.value.map((module, index) => {
    selection[index] = boolean ? true : false;
  });

  if (boolean) {
    selectedItem.value = selection;
  } else {
    selectedItem.value = selection;
  }
};

watch(
  () => selectedItem.value,
  () => {
    noOfSelected.value = extractNoOfSelected(selectedItem.value);
    extractSelectedItemsObj(selectedItem.value, users.value);
  },
  { deep: true }
);

</script>

<template>
  <section>
    <PageHeader />

    <div>
      <PageSelectionBar
        :no_of_items="noOfSelected"
        @update-input="console.log('asdfasdf')"
      />
    </div>

    <!-- table  -->
    <CommonTable
      @checkboxChanged="selectAll"
      :allSelected="selectedItem"
      :data="tableHeader"
      :last_page="paginationData ? paginationData[0].page : 1"
      :first_Page="1"
      :per_page="10"
      :present_page="1"
      :present_route="crudLink"
      :isEmpty="users ? false : true"
    >
      <tr
        v-for="(user, index) in users"
        :key="index + Math.random(1000)"
        :id="'row' + user._id"
      >
        <td class="w-8 pl-4 py-3 text-xs text-gray-500">
          <div class="flex items-center">
            <input type="checkbox" class="mr-2 h-3 w-3 rounded-sm" 
              v-model="selectedItem[index]" />
          </div>
        </td>
        <td class="px-4 py-3 text-xs text-gray-500">
          <div class="flex items-center justify-center">
            <p>{{ index }}</p>
          </div>
        </td>
        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.First_Name }}</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.Last_Name }}</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.Role }}</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.status }}</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.phone }}</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.email }}</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-xs text-gray-600 text-center">{{ user.createdAt.substring(0, 10) }}</p>
        </td>
        <CommonActioncell
          :row-id="123"
          :edit-link="crudLink + '/edit/' + 123"
          :delete-link="path"
          @update-input="submitDeleteEmit"
        />
      </tr>
    </CommonTable>
  </section>
</template>

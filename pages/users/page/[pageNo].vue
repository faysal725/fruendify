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

const sorting = async (dt) => {
  console.log(dt);
};

async function submitDeleteEmit(dt) {
  console.log(dt);
}
</script>

<template>
  <section>
    <PageHeader />

    <div>
      <!-- search section  -->
    </div>

    <!-- table  -->
    <CommonTable :data="tableHeader" @update-input="sorting" 
      :last_page="10"
      :first_Page="1"
      :per_page="10"
      :present_page = "1"
      :present_route="crudLink"
      >
      <tr>
        <td class="w-8 pl-4 py-3 text-sm text-gray-500">
          <div class="flex items-center">
            <input type="checkbox" class="mr-2 h-3 w-3 rounded-sm" value="2" />
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-gray-500 ">
          <div class="flex items-center"><p>1</p></div>
        </td>
        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">Eng. Helal</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">Uddin</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">Product Manager</p>
        </td>

        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">Active</p>
        </td>
        
        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">01718230208</p>
        </td>
        
        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">helalaudiology@gmail.com

            </p>
        </td>
        
        <td class="px-2 py-2">
          <p class="text-sm text-gray-600">30-Dec-23



</p>
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

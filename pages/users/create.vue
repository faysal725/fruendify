<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['login']
})

const body = ref({
  first_name: "",
  last_name: null,
  email: null,
  phone: "",
  image: null,
  role_id: "",
  status: false,
  password: null,
  confirm_password: null,
});
const errors = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role_id: "",
  password: "",
  confirm_password: null,
});
const roles = ref([
  {
    id: 1,
    name: "Super",
    slug: "super",
  },
  {
    id: 2,
    name: "Product Manger",
    slug: "product-manger",
  },
]);

const toggling = (data) => {
  console.log(data);
};

const getRolesName = (id) => {
  const data = roles.value.find((item) => item.id === id);
  return data;
};

const save = async () => {
  console.log("data");
};
</script>

<template>
  <section>
    <PageHeader />

    <div>
      <form @submit.prevent="save">
        <FormContainer
          :title="'User Information'"
          :description="'Every information should be valid'"
        >
          <FormImage v-model="body.image" />
          <div class="grid grid-cols-12 gap-x-4 gap-y-2">
            <div class="col-span-12 md:col-span-6">
              <FormInputText
                v-model="body.first_name"
                :title="'First Name'"
                :label="'first_name'"
                :type="'text'"
                :error="errors.first_name"
                :oldValue="''"
                :required="true"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <FormInputText
                v-model="body.last_name"
                :title="'Last Name'"
                :label="'last_name'"
                :type="'text'"
                :error="errors.last_name"
                :oldValue="''"
                :required="true"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-x-4 gap-y-2">
            <div class="col-span-12 md:col-span-6">
              <FormInputText
                v-model="body.email"
                :title="'Email'"
                :label="'email'"
                :type="'email'"
                :error="errors.email"
                :oldValue="''"
                :required="true"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <FormInputText
                v-model="body.phone"
                :title="'Phone'"
                :label="'phone'"
                :type="'text'"
                :error="errors.phone"
                :oldValue="''"
                :required="true"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-x-4 gap-y-2">
            <div class="col-span-12 md:col-span-6">
              <FormCombobox
                :title="'Roles'"
                :options="roles"
                v-model="body.role_id"
                :defaultVal="getRolesName(body.role_id)?.name"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <FormToggle :oldValue="body.status" @update-input="toggling" />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-x-4 gap-y-2">
            <div class="col-span-12 md:col-span-6">
              <FormPassword
                v-model="body.password"
                :title="'password'"
                :label="'password'"
                :type="'password'"
                :error="errors.password"
                :oldValue="''"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <FormPassword
                v-model="body.confirm_password"
                :title="'confirm password'"
                :label="'confirm_password'"
                :type="'password'"
                :error="errors.confirm_password"
                :oldValue="''"
              />
            </div>
          </div>
        </FormContainer>

        <div class="mb-4">
          <div class="flex items-center justify-end gap-4">
            <ButtonSecondary :name="'Cancel'" :link="'/users'" />

            <ButtonLarge :name="'Save'" />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

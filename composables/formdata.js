const useForm = () => {
  const formdata = ref();
  const form = ref({});
  const deep = ref(false);

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  const processForm = (key, data = null, prev = null) => {
    if (form.value.hasOwnProperty(key)) {
      data = form.value[key];
    }
    if (Array.isArray(data) && deep) {
      return data.forEach((item, index) => {
        // processForm(`${key}[${index}]`,item)
        formdata.value.append(key, item);
      });
    }

    if (data && data.constructor === File) {
      // console.log(data,'ddd')
      return formdata.value.append(key, data);
    }

    if (isObject(data)) {
      console.log(data, key, "first phase");
      // return Object.keys(data).forEach(item=>{
      //     console.log(key, item, data[item], 'object')
      //     processForm(`${key}[${item}]`,data[item])
      // })
      // formData.append(key, data);
      return formdata.value.append(key, data);
      // processForm(`${key}`,data)
    }

    formdata.value.append(key, data ?? "");
  };

  const submit = (data, deeper = false) => {
    formdata.value = new FormData();
    form.value = data;
    deep.value = deeper;
    for (const key in form.value) {
      processForm(key);
    }
    return formdata.value;
  };

  return {
    submit,
  };
};

export default useForm;

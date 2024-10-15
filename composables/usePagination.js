import { ref } from "vue";

export default function () {
  const paginationData = ref({
    totalDocuments: 10,
    totalPages: 1,
    currentPage: 1,
    perPage: 30,
  });

  const paginationController = (callback, forword = true) => {
    // console.log('runned', paginationData)
    if (paginationData.value.currentPage == paginationData.value.totalPages) {
      return;
    } else {
      if (
        forword &&
        paginationData.value.currentPage < paginationData.value.totalPages
      ) {
        paginationData.value.currentPage++;
      } else if (!forword && paginationData.value.currentPage > 1) {
        paginationData.value.currentPage--;
      }
      callback();
    }
  };

  return {
    paginationData,
    paginationController,
  };
}

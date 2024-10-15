import { getActivePinia } from "pinia";
import { networkPost } from "~/Utilities/network";
import { useAuthStore } from "~/stores/authStore";
import { useErrorsStore } from "~~/stores/errors";

export const api = () => {
  const { baseUrl } = useRuntimeConfig().public;
  return baseUrl;
  // return "http://127.0.0.1:5000"
};

// export const api = () => {
// 	// return useRuntimeConfig().public.BASE_URL
// 	return "http://127.0.0.1:5000"
// }

export const networkImage = (imgPath) => {
  return api() + "/" + imgPath;
};

export const registration = async (body) => {
  let response = await networkPost({
    method: "POST",
    body: body,
    heads: {},
    path: api() + "/api/auth/register",
  });
  if (response.status == 200) {
    console.log(response.res);
    saveAuth(response.res, "registration");
  } else {
    console.log("failed");
  }
  return response;
};

export const otpVerification = async (body) => {
  let response = await networkPost({
    method: "POST",
    body: body,
    heads: {},
    path: api() + "/api/auth/verify/otp",
  });
  if (response.status == 200) {
    saveAuth(response, "otp");
  }else{
    // saveAuth(response, "otp");
  }
  return response;
};

export const login = async (body) => {
  // const {
  //   data: result,
  //   error,
  //   refresh,
  //   pending,
  // } = await useLazyAsyncData("login", () =>
  //   $fetch(api() + "/api/auth/login", {
  //     method: "POST",
  //     body: form,
  //   })
  // );

  // return { result, error, pending, refresh };

  let response = await networkPost({
    method: "POST",
    body: body,
    heads: {},
    path: api() + "/api/auth/login",
  });

  // console.log(response.res.tokens.access.token, response.res.tokens.refresh.token)
  if (response.status == 200) {
    saveAuth(response.res);
  } else {
    console.log("failed");
  }
  return response;
};

export const saveAuth = (credentials, type) => {
  const authStore = useAuthStore();
  const { saveAuthAccess, savePrimaryData, saveOtpData } = authStore;

  if (type == "otp") {
    authStore.saveOtpData(true);
  } else if (type == "registration") {
    authStore.savePrimaryData(credentials);
  } else {
    authStore.saveAuthAccess(credentials);
  }
};

export const loggedIn = () => {
  const authStore = useAuthStore();
  const { authenticated } = authStore;

  return authStore.authenticated();
};

export const logout = async () => {
  const router = useRouter();

  const authStore = useAuthStore();
  const { getToken } = authStore;

  const { error } = await useFetch(api() + "/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.getToken()}`,
    },
  });

  if (!error.value) {
    window.localStorage.clear();
    authStore.$reset();
    errorsStore.$reset();

    router.push("/login").then(() => window.location.reload());
  }
};

export const fetchAuthUser = async () => {
  const authStore = useAuthStore();
  const { getToken, setAuthUser } = authStore;

  const { data: result } = await useFetch(api() + "/auth/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.getToken()}`,
    },
  });

  if (result) {
    authStore.setAuthUser(result.value.data);
  }
};

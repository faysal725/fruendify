import { useProfileStore } from "~/stores/profileStore";

export const isProfileCompleted = () => {
  const profileStore = useProfileStore();
  let isCompleted = false;
  // console.log(profileStore.profileData.profile_completed);
  let { email, first_name, birth_date,  gender, interests } =
    profileStore.profileData;
  if (
    email &&
    first_name &&
    birth_date &&
    gender &&
    interests
  ) {
    isCompleted = true;
  } else {
    isCompleted = false;
  }

  return isCompleted;
};

export const isProfileImageVerified = () => {
  const profileStore = useProfileStore();

  
  let isCompleted = false;

  if (profileStore.profileData.is_verified) {
    isCompleted = true;
  } else {
    isCompleted = false;
  }

  return isCompleted;
};


export const isOwnersProfile = (profileId) => {
  const profileStore = useProfileStore();

  
  let isOwnersProfile = false;

  if (profileStore.profileData._id == profileId) {
    isOwnersProfile = true;
  } else {
    isOwnersProfile = false;
  }

  return isOwnersProfile;
};

//   email, full_name birth_date aboutFrundify gender interests

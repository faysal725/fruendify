export function calculateAge(birthDateStr) {
  // Create Date objects for birthDate and today
  const birthDate = new Date(birthDateStr);
  const today = new Date();

  // Get full year values for birth and current date
  const birthYear = birthDate.getFullYear();
  const currentYear = today.getFullYear();

  // Calculate age by subtracting birth year from current year
  let age = currentYear - birthYear;

  // Adjust age if birthday hasn't happened this year yet
  const month = today.getMonth();
  const day = today.getDate();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  if (month < birthMonth || (month === birthMonth && day < birthDay)) {
    age--;
  }

  // Return the calculated age
  return age;
}

export function metersToKilometers(meters) {
  return Math.floor(meters / 1000);
}

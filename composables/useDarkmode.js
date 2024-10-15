const useSetColorTheme = (newTheme) => {
  useColorMode().preference = newTheme;
};

export default useSetColorTheme;

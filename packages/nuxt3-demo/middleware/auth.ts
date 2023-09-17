export default defineNuxtRouteMiddleware(() => {
  function hasPermission() {
    return false;
  }
  if (hasPermission() === false) {
    console.log("🚀 ~ file: auth.ts:6 ~ defineNuxtRouteMiddleware ~ false: no permisson");
    return navigateTo("/about");
  }
});

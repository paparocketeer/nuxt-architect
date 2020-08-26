export default async ({ app }) => {
    app.router.afterEach((to, from) => {
      localStorage.setItem('LS_FROM_KEY', from.path);
    });
  
  }
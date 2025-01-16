import router from '@/router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;
  // 确保页面刷新时，首次加载时，能等待后端返回用户信息后在校验权限
  await loginUserStore.fetchLoginUser();
  loginUser = loginUserStore.loginUser;
})

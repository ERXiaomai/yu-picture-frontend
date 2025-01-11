import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 存储登录用户信息的状态
 */
//一个状态就存储一类要共享的数据
  export const useLoginUserStore = defineStore('counter', () => {
  const loginUser = ref<any>({
    userName:"未登录"
  })

  async function fetchLoginUser() {
    // todo 由于后端还没提供接口，暂时注释
    // const res = await getCurrentUser();
    // if (res.data.code === 0 && res.data.data) {
    //   loginUser.value = res.data.data;
    // }
    //测试用户登录：3s后自动登录
    // setTimeout(() => {
    //   loginUser.value = {
    //     userName:"测试用户",id:1
    //   }
    // }, 3000)
  }
  /**
   * 设置登录用户
   * @param newLoginuser
   */
  function setLoginUser(newLoginuser:any){
    loginUser.value = newLoginuser
  }

  //返回
  return { loginUser, fetchLoginUser, setLoginUser }
})




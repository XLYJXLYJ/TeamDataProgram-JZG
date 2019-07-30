const Fly = require("flyio/dist/npm/wx");
const fly = new Fly()

fly.config.baseURL = '';
fly.config.timeout = 10000
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  request.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return request;
})

fly.interceptors.response.use(res => {
  if (res.status == 200) {
    console.log(res)
    return res.data
  }
  return Promise.reject(res)
}, error => {
  const { response } = error;
  wx.showModal({
    title: '提示',
    content: error.response.data.message,
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
})

export default fly;
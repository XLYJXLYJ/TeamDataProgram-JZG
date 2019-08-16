import{ USER_INFO } from './mutation-type.js'
export default{
    [USER_INFO](state,v){
        state.userInfo = v
        console.log(state)
    }
}
import { LOGIN_PAGE } from "./Route"

//FUNCTIONLOGOUT
export function logout(resetUtente, resetChat, history, dispatch){
    dispatch(resetUtente())
    dispatch(resetChat())
    history.push(LOGIN_PAGE)
}
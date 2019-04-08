import {CHANGE_THEME,} from './type'



 const themeChangerAction =()=>({
  type:CHANGE_THEME,
})

export const themeChanger=()=>{
  return themeChangerAction ()
}
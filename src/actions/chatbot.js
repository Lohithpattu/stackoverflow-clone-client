export const valid=()=>dispatch=>{
    dispatch({type:'VERIFIED'})
}
export const inValid=()=>dispatch=>{
    dispatch({type:'UNVERIFIED'})
}
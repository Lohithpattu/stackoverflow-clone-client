const chatbotReducer = (state = {isVerified:localStorage.getItem('isVerified')?JSON.parse(localStorage.getItem('isVerified')):false} , action) => {
    switch (action.type) {
      case "VERIFIED":
        localStorage.setItem("isVerified",JSON.stringify(true))
        return { ...state, isVerified: true };
      case "UNVERIFIED":
        localStorage.setItem("isVerified",false)
        return { ...state,isVerified:false};
      default:
        return state;
    }
  };
  
  export default chatbotReducer
  
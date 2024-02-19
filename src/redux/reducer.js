const initialState = {
    points: 0,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_HIGHEST_SCORE":
        return { ...state, points: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
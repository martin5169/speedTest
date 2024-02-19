const initialState = {
    points: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_HIGHEST_SCORE":
        const updatedPoints = [...state.points, action.payload].sort((a, b) => b - a).slice(0, 3);
        return { ...state, points: updatedPoints };
      default:
        return state;
    }
  };
  
  
  export default reducer;
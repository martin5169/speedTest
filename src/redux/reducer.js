const initialState = {
    points: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_HIGHEST_SCORE":
        const newScore = action.payload;
        if (!state.points.includes(newScore)) {
          const updatedPoints = [...state.points, newScore].sort((a, b) => b - a).slice(0, 3);
          return { ...state, points: updatedPoints };
        }
        return state;
      default:
        return state;
    }
  };
  
  
  
  export default reducer;
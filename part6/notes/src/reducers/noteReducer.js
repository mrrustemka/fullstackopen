const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      state.concat(action.payload);
      return state;
    default:
      return state;
  }
};

export default noteReducer;

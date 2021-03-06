// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense._id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense._id === action.updates._id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        };
      });
    case 'SET_EXPENSE':
      return action.expenses;
    default:
      return state;
  }
};
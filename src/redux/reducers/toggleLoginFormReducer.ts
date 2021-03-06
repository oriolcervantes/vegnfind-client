import IAction from '../actions/type';

export const toggleLoginFormReducer = (state = true, action: IAction) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN_FORM':
      return !state;
    default:
      return state;
  }
};

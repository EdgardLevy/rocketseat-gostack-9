import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      // return [...state, {...action.product, ammout: 1}];
      return produce(state, draft => {
        // const productIndex = draft.findIndex(p => p.id === action.id);

        // if (productIndex >= 0) {
        //   draft[productIndex].amount += 1;
        // } else {
        //   draft.push({...action.product, amount: 1});
        // }

        // as validacoes vao ficar no saga
        const {product} = action;
        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      // return [...state, {...action.product, ammout: 1}];
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}

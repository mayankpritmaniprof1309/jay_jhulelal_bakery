export const cartReducer = (state, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const { _id } = action.payload;

      if (!_id) {
        console.error("ADD_TO_CART blocked: payload has no _id", action.payload);
        return state;
      }

      const existing = state.find(item => item._id === _id);

      if (existing) {
        return state.map(item =>
          item._id === _id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }

      return [...state, action.payload];
    }

    case "UPDATE_QUANTITY":
      return state.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "REMOVE_ITEM":
      return state.filter(item => item._id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
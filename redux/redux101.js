import {
  createStore,
  combineReducers,
  compose,
  bindActionCreator,
  applyMiddleware
} from "redux";

// compose
const makeLouder = string => string.toUpperCase();
const repeatThreeTimes = string => string.repeat(3);
const embolden = string => string.bold();

const makeLouderAndBoldAndRepeat = compose(
  embolden,
  repeatThreeTimes,
  makeLouder
);

makeLouderAndBoldAndRepeat("Iulian");

// constants
const ADD = "ADD";

// initial state

const initialState = {
  value: 1,
  error: null
};

// create reducers
const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      const value = state.value;
      const { amount } = action.payload;
      return {};
    default:
      return state;
  }
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ERROR:
      return {};
    default:
      return state;
  }
};

const reducer = combineReducers({
  calculator: calculatorReducer,
  error: errorReducer
});

// create store
const store = createStore(reducer);
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Object.keys(store) --> ["dispatch", "subscribe", "getState", "replaceReducer"]
// store.getState(); // [object Object] { value : 1 }
// store.dispatch({ type: <string>, payload: <object>, meta: <object> });
store.dispatch({ type: "ADD", payload: { amount: 3 } });
store.dispatch({ type: "ADD", payload: { amount: 2 } });

// action creator
const addAction = {
  type: ADD,
  payload: {
    amount: 5
  }
};

// to this
const createAddAction = amount => ({
  type: ADD,
  payload: { amount }
});

// like this
store.dispatch(createAddAction(4));
// or like this
const dispatchAdd = bindActionCreator(createAddAction, store.dispatch);
dispatchAdd();

// creating a custom bindActionCreators
const customBindActionCreators = (actions, dispatch) => {
  return Object.keys(actions).reduce((boundActions, key) => {
    boundActions[key] = bindActionCreator(actions[key], dispatch);
  });
};

// custom middleware (function that return another function)
const logger = ({ getState }) => {
  return next => action => {
    console.log(`Middleware`, getState(), action);
    const value = next(action);
    return value;
  };
};

const secondStore = createStore(reducer, applyMiddleware(logger));

// unsubscribe
unsubscribe();

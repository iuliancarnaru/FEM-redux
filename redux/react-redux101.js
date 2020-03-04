import React, { Component } from "react";
import { render } from "react-dom";
import { createStore, bindActionCreators } from "redux";
import { connect, Provider } from "react-redux";

// initial state
const initialState = {
  count: 0
};

// constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// action creator
const incrementValue = () => ({
  type: INCREMENT
});

const decrementValue = () => ({
  type: DECREMENT
});

const resetValue = () => ({
  type: RESET
});

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      };
    case DECREMENT:
      return {
        count: state.count - 1
      };
    case RESET:
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, increment } = this.props;
    return (
      <div>
        <p>{count}</p>
        <button onClick={increment}>+</button>
        <button>-</button>
        <button>reset</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(incrementValue()),
//   decrement: () => dispatch(decrementValue()),
//   reset: () => dispatch(resetValue())
// });

// OR

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       incrementValue,
//       decrementValue,
//       resetValue
//     },
//     dispatch
//   );
// };

// OR if you don't need to pass data trough

const mapDispatchToProps = {
  incrementValue,
  decrementValue,
  resetValue
};

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

// variations
// const CounterContainer = connect(null, mapDispatchToProps)(Counter);
// const CounterContainer = connect(mapStateToProps)(Counter);

// you need index.html
// hooking up to redux store with Provider
render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById("root")
);

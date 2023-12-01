import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

class ReduxComponent extends Component {
  state = {
    nameList: [],
  };

  addToList = (event) => {
    event.preventDefault();
    if (event.target.toList.value !== '') {
      this.props.onAddName(event.target.toList.value);
      event.target.toList.value = null;
    }
  };

  render() {
    return (
      <div>
        <h1>React Redux</h1>
        {this.props.nameList.length !== 0 ? (
          <ul>
            {this.props.nameList.map((el, index) => (
              <li key={index}>
                {el}{' '}
                <button onClick={() => this.props.onDeleteName(index)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h3>Add to state</h3>
        )}
        <form onSubmit={this.addToList}>
          <input type="text" name="toList"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// the state managed by redux is not passed as state but instead as porps to component
// the state passed here is the one from the reducer.js, the initialState
const mapStateToProps = (state) => {
  return {
    nameList: state.reduce.nameList,
  };
};

// which type of actions should be dispatched from this container
const mapDispatchToProps = (dispatch) => {
  return {
    // actions can be dispatched from this property
    // onAddName: (data) => dispatch({ type: 'ADD', payload: data }),
    // onDeleteName: (id) => dispatch({ type: 'DELETE', payload: id }),

    // using action creators
    onAddName: (data) => dispatch(actions.addName(data)),
    onDeleteName: (id) => dispatch(actions.asyncDeleteName(id)),
  };
};

// For functional components

// instead of using connect we can also use useDispatch and useSelector for functional components
// we can use this dispatch to dispatch actions instead
// instead of props.onAddName we simply call onAddName
// const dispatch = useDispatch();
// const onAddName = (data) => dispatch(actions.addName(data));

// useSelector will be used to manage state
// we can use multiple states individually
// const nameList = useSelector(state => {return state.reduce.nameList});

// export default ReduxComponent;

// if state is not required just pass null
// connect returns a function which takes an hoc
// to connect we can pass config i.e which state is required and which actions do we need to dispatch
export default connect(mapStateToProps, mapDispatchToProps)(ReduxComponent);

import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import Expenses from './components/Expense/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import UsingContext from './components/UseContext/UsingContext';
import IncreaseCounter from './components/UseRedux/IncreaseCounter';
import Counter from './components/UseRedux/UseRedux';
import UsingReduer from './components/UsingReducer/UsingReducer';
import AuthContext from './store/auth-context';
import store from './store/redux/ReduxStore';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NewExpense />
        <Expenses></Expenses>
      </div>
      <Counter />
      <IncreaseCounter />
      <UsingReduer />
      <AuthContext.Provider value={{ isLoggedIn: false }}>
        <UsingContext />
      </AuthContext.Provider>
      <Link to={'/profile'}>Profile Page </Link>
    </Provider>
  );
}

export default App;

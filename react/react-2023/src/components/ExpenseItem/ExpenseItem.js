import { useState } from 'react';
import Card from '../Card/Card';
import styles from './ExpenseItem.module.css';

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);

  function clickHandler() {
    setTitle('Title changes!!!');
  }

  return (
    <Card>
      <h1 className={styles.colorRed}>{props.expenseDate.toLocaleString()}</h1>
      <div>
        <h2>{title}</h2>
        <h3>{props.expenseAmount}</h3>
      </div>
      <button onClick={clickHandler}>Change button</button>
    </Card>
  );
}

export default ExpenseItem;

import ExpenseForm from './ExpenseForm';

const NewExpense = () => {
  // to pass data from parent to child we can use props with attributes
  // but to pass data from child to parent we can use function reference and call it up the chain
  const saveExpenseDataHandler = (expenseData) => {
    console.log(expenseData);
  };

  return (
    <>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </>
  );
};

export default NewExpense;

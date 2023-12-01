import ExpenseItem from '../ExpenseItem/ExpenseItem';

function Expenses() {
  const expenses = [
    {
      id: 1,
      expenseDate: new Date(),
      expenseTitle: 'Car Expense',
      expenseAmount: '$220',
    },
    {
      id: 2,
      expenseDate: new Date(),
      expenseTitle: 'Bike Expense',
      expenseAmount: '$22',
    },
    {
      id: 3,
      expenseDate: new Date(),
      expenseTitle: 'Home Expense',
      expenseAmount: '$22000',
    },
  ];

  return (
    <div>
      {/*       
      {1 === 1 && (//in JS this will return the part after the &&, we can also use jsx conditionally
        <ExpenseItem
          title={expenses[0].expenseTitle}
          expenseDate={expenses[0].expenseDate}
          expenseAmount={expenses[0].expenseAmount}
        />
      )}

      <ExpenseItem
        title={expenses[1].expenseTitle}
        expenseDate={expenses[1].expenseDate}
        expenseAmount={expenses[1].expenseAmount}
      />
      <ExpenseItem
        title={expenses[2].expenseTitle}
        expenseDate={expenses[2].expenseDate}
        expenseAmount={expenses[2].expenseAmount}
      /> */}
      {expenses.map((expense) => {
        return (
          <ExpenseItem
            key={expense.id} // this key is needed for react to only render the changed element and not render the entire list for any state change
            title={expense.expenseTitle}
            expenseDate={expense.expenseDate}
            expenseAmount={expense.expenseAmount}
          />
        );
      })}
    </div>
  );
}

export default Expenses;

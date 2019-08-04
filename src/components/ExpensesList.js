import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

const ExpensesList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => {
            return <ExpenseItem key={expense.id} expense={expense} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    const expenses = selectedExpenses(state.expenses, state.filters)
    return {
        expenses
    };
};

export default connect(mapStateToProps)(ExpensesList);
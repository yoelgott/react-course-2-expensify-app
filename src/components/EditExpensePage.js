import React from 'react';
import  { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = (props) => (
    <div>
        <h1>Edit Expense</h1>
        <ExpenseForm
            id={props.match.params.id}
            expense={props.expense}
            onSubmit={(updates) => {
                const id = props.match.params.id;
                props.dispatch(editExpense(id, updates));
                props.history.push('/');
            }}
        />
        <button onClick={() => {
            props.dispatch(removeExpense({ id: props.expense.id }));
            props.history.push('/');
        }}>Remove</button>
    </div>
);

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find(({ id }) => id === props.match.params.id)
});

export default connect(mapStateToProps)(EditExpensePage);
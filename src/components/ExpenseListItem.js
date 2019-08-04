import React from 'react';
import { NavLink } from 'react-router-dom';

const ExpenseItem = (props) => {
    return (
        <div>
            <NavLink to={`/edit/${props.expense.id}`}><h3>{props.expense.description}</h3></NavLink>
            <p>{props.expense.amount} - {props.expense.createdAt}</p>
        </div>
    );
};

export default ExpenseItem;

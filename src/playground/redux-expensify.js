import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE EXPENSE BY ID
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT EXPENSE
const editExpense = (id, updates = {}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return (state.filter(({ id }) => id != action.id));
        case 'EDIT_EXPENSE':
            return (state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                };
                return expense;
            }));
        default:
            return state;
    }
};

//SET TEXT FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT BY
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET START DATE
const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
});

//SET END DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };
        default:
            return state
    }
};

//get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = (expense.description.toLowerCase()).includes(text.toLowerCase());
    
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.date >= b.date ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount >= b.amount ? 1 : -1;
        };
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});


/* ******Action Manipulate************** */
const expense1 = store.dispatch(addExpense({
    description: 'January Rent',
    note: 'This was the final payment for the address',
    amount: 200,
    createdAt: 123
}));

const expense2 = store.dispatch(addExpense({
    description: 'hello',
    note: 'why me??',
    amount: 300,
    createdAt: 0
}));

// store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));

// store.dispatch(removeExpense({ id: expense1.expense.id }));

store.dispatch(setTextFilter('e'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(122));

/* ****************************** */
const demoState = {
    expenses: [{
        id: '3e332eaaa',
        description: 'January Rent',
        note: 'This was the final payment for the address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};

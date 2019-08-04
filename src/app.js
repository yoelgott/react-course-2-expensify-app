import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import visibleStore from './selectors/expenses';
import './styles/styles.scss';
import 'normalize.css/normalize.css';

const store = configureStore();
// store.subscribe(() => {
//     console.log(visibleStore(store.getState().expenses, store.getState().filters));
// });

store.dispatch(addExpense({ description: 'Water BiLL', note: 'my first one', amount: 5000, createdAt: 100000 }));
store.dispatch(addExpense({ description: 'Gas BiLL', note: 'my second one', amount: 4000, createdAt: 456 }));
store.dispatch(addExpense({ description: 'Rent', note: 'my second one', amount: 109500, createdAt: 700 }));

// store.subscribe(() => {
//     console.log(visibleStore(store.getState().expenses, store.getState().filters))
// })

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

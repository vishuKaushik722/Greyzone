import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer, setProductListReducer} from './reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    main: reducer,
    products: setProductListReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

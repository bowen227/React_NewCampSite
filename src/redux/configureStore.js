import { createStore, combineReducers } from 'redux';
import { Campsites } from './Campsites';
import { Comments } from './Comments';
import { Partners } from './Partners';
import { Promotions } from './Promotions';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
};
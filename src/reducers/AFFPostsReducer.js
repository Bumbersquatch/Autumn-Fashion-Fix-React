import {FETCH_POSTS_PENDING, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR} from '../actions/AFFPostsActions';

// The inital state
const initialState = {
    pending: false,
    posts: [],
    error: null
}

export default function AFFPostsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                pending: false,
                posts: [...state.posts, ...action.posts.items]
            }
        case FETCH_POSTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

// Selectors - Not needed but nice to have
export const getPosts = state => state.AFFPostsReducer.posts;
export const getPostsPending = state => state.AFFPostsReducer.pending;
export const getPostsError = state => state.AFFPostsReducer.error;
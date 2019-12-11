//Action types - could be in their own file and import them in
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

//Normal Redux Actions - These are pure functions
function fetchPostsPending() {
    return {
        type: FETCH_POSTS_PENDING
    }
}

function fetchPostsSuccess(posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts: posts
    }
}

function fetchPostsError(error) {
    return {
        type: FETCH_POSTS_ERROR,
        error: error
    }
}
// Redux-Thunk - Not pure functions, basically a javascript closure. These are used to make changes to the state
export function fetchPosts(page, numPosts) {
    return dispatch => {
        dispatch(fetchPostsPending());
        fetch(`https://private-cc77e-aff.apiary-mock.com/posts?page=${page}&numPosts=${numPosts}`)
        .then(res => res.json())
        .then(res => {

            res['items'].sort(function (a, b) {
                const dateA = new Date(a.item_published),
                    dateB = new Date(b.item_published);
                return dateB - dateA;
            });

            dispatch(fetchPostsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchPostsError(error));
        })
    }
}
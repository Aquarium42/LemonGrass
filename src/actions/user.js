import http from '../form/http'

function fetchUserStart(subreddit) {
    return {
        type: 'USER_FETCHING'
    }
}
function fetchUserFail(payload){
    return{
        type: 'USER_FAIL',
        payload
    }
}
function fetchUserSuccess(payload){
    console.log('payload', payload)
    return {
        type: 'USER_SUCCESS',
        payload
    }
}

export default function fetchUser() {
    console.log('fetchUser');

    return dispatch => {
        dispatch(fetchUserStart)

        return http('currentUser', 'GET').then((data) =>{
            dispatch(fetchUserSuccess(data))
        })
            .catch((error)=>{
                dispatch(fetchUserFail(error))
            })
    }
}
import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchUserAction from '../../actions/user'


class AuthResult extends Component{
    render(){
        if(this.props.isLoading){
            return <h1>Загрузка</h1>
        }
        return <h1>Привет, {this.props.user || 'алтиматер'}</h1>
    }
    componentDidMount() {
        this.props.fetchUser()
    }
}

function mapStateToProps(state) {
    const {userReducer} = state
    return {
        user:userReducer.data && userReducer.data.login,
        isLoading:userReducer.isLoading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(fetchUserAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthResult)
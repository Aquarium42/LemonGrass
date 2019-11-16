import React, {Component} from 'react'
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from "../../UI/Backdrop/Backdrop";

const links=[
    {to: '/', label:'Главная', exact: false, icon: <i className="fas fa-lemon"></i>},
    {to: '/auth', label:'Авторизация', exact: false, icon: <i className="fas fa-user-alt fa-xs"></i>},
    {to: '/players', label:'Игроки', exact: false, icon: <i className="fas fa-users fa-xs"></i>},
    {to: '/tournaments', label:'Турниры', exact: true, icon: <i className="fas fa-trophy"></i>},
    {to: '/quiz', label:'Тест', exact: false, icon: <i className="fas fa-graduation-cap"></i> },
]

class Drawer extends Component{
    clickHandler =()=>{
        this.props.onClose()
    }
    renderLinks(){
        return links.map((link, index)=> {
            return (
                <li key={index}>
                    <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={this.clickHandler}
                    >
                        {link.icon} {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render(){
        const cls=[classes.Drawer]
        if (!this.props.isOpen){
            cls.push(classes.close)
        }
        return(
           <React.Fragment>
               <nav className={cls.join(' ')}>
                   <ul>
                       {this.renderLinks()}
                   </ul>
               </nav>
               {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
           </React.Fragment>

        )
    }
}
export default Drawer
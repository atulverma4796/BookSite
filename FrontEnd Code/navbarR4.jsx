import React from "react";
import {Link} from "react-router-dom";
export default class NavbarR4 extends React.Component{
    render(){
        return  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
       BookSite
        </Link>
        <div className="">
            <ul className="navbar-nav mr-auto">
               {this.props.type.map(v=><li className="nav-items" key={v.name}>
               <Link className="nav-link" to={`/books/${v.value}`}>
               {v.name}</Link>
               </li>)}   
            </ul>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/books/new">Add Book</Link>
                </li>
            </ul>
        </div>
    </nav>
    }
}
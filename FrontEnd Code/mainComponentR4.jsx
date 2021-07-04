import React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import NavbarR4 from "./navbarR4";
import AddBook from "./addBook";
import Books from "./books";
import ShowBook from "./showBook";
export default class MainComponent extends React.Component{
    state={
        type:[
            {name:"New Arrival",
             value:"newarrival=yes"},
             {name:"Children",
              value:"Children"},
              {name:"Fiction",
              value:"Fiction"},
              {name:"Mystery",
                value:"Mystery"},
                {name:"Management",
                 value:"Management"},
                 {name:"All Books",
                value:" "}],
    };
    render(){
        const{type}=this.state;
        return (<div className="container-fluid">
            <NavbarR4 type={type}/>
            <Switch>
            <Route path="/books/new" component={AddBook}/>
            <Route path="/book/:id" component ={ShowBook}/>
            <Route path="/books/:value" component={Books}/>
            </Switch>
        </div>);
    }
}
import React from "react";
import http from "./httpService.js";
export default class ShowBook extends React.Component{
    state={data:{}};
   async componentDidMount(){
        let {id} =this.props.match.params;
        let response = await http.get(`/booksapp/book/${id}`);
        let{data}=response;
        this.setState({data:data}); 
    }
    render(){
        const{data}=this.state;
        console.log(this.state.data);
        return <div className="container m-4 bg-light">
            <h4>Book : {data.name}</h4>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Author : </div>
                <div className="col-6">{data.author}</div>
            </div>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Genre : </div>
                <div className="col-6">{data.genre}</div>
            </div>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Description : </div>
                <div className="col-6">{data.description}</div>
            </div>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Blurb : </div>
                <div className="col-6">{data.blurb}</div>
            </div>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Review : </div>
                <div className="col-6">{data.review}</div>
            </div>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Price : </div>
                <div className="col-6">{data.price}</div>
            </div>
            <div className="row border">
                <div className="col-3"></div>
                <div className="col-3">Rating : </div>
                <div className="col-6">{data.avgrating}</div>
            </div>
        </div>
    }
}
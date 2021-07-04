import React from "react";
import {Link} from "react-router-dom";
import http from "./httpService.js";
import queryString from "query-string";
import LeftCBR4 from "./leftCBR4";
export default class Books extends React.Component{
    state={
        data:[],
        languages:["Latin", "English", "French", "Other"],
        bestSell : ["Yes","No"],
    };
  async  fetchData(){
     let queryParam = queryString.parse(this.props.location.search);
     let searchStr = this.makeSearchString(queryParam);
     let {value} = this.props.match.params; 
     let str="";
     if(value==="newarrival=yes"){
         str = `/booksapp/books?newarrival=yes&${searchStr}`;
     }else if(value===" "){
        str = `/booksapp/books?${searchStr}`;
     }else if(value==="Children" || value==="Fiction" || value==="Mystery" || value==="Management"){
        str = `/booksapp/books/${value}?${searchStr}`;
     }
     let response = await http.get(str);
     let {data}=response;
     this.setState({data:data});
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(prevProp,prevState){
        if(prevProp!==this.props){
            this.fetchData();
        }
    }
    handlePage=(incr)=>{
        let queryParam = queryString.parse(this.props.location.search);
        let {page="1"}=queryParam;
        let newPage = +page+incr;
        queryParam.page = newPage;
        let {value}=this.props.match.params;
        this.callURL(`/books/${value}`,queryParam);
    }
    callURL=(url,option)=>{
        let searchStr = this.makeSearchString(option);
        this.props.history.push({
            pathname:url,
            search:searchStr
        });
    }
    handleChange=(option)=>{
        option.page="1";
        let {value}=this.props.match.params;
        this.callURL(`/books/${value}`,option);
    }
    makeSearchString=(option)=>{
        let{page,bestseller,language}=option;
        let searchStr="";
        searchStr = this.addToString(searchStr,"page",page);
        searchStr = this.addToString(searchStr,"bestseller",bestseller);
        searchStr = this.addToString(searchStr,"language",language);
        return searchStr;
    }
    addToString=(str,paramName,paramVal)=>
    paramVal?str?`${str}&${paramName}=${paramVal}`:`${paramName}=${paramVal}`:str;
    render(){
        const{books=[],pageInfo={},refineOptions={}}=this.state.data;
        const{bestseller=[],language=[]}=refineOptions;
        const{pageNumber,numberOfPages,numOfItems,totalItemCount}=pageInfo;
        const{languages,bestSell}=this.state;
        const queryParam =queryString.parse(this.props.location.search);
        let c=1;
        return (<div className="container bg-light m-3">
            <div className="row">
                <div className="col-3 bg-light">
                <LeftCBR4 option={queryParam} best={bestseller} lg={language} lang={languages} bestSell={bestSell} onOptionChange={this.handleChange}/>
                </div>
                <div className="col-9">
            <h5>Showing {pageNumber} to {books.length} of {totalItemCount}</h5>
            <div className="row bg-success text-dark">
                <div className="col-2 ">Title</div>
                <div className="col-2 ">Aurthor</div>
                <div className="col-1 ">Language</div>
                <div className="col-2 ">Genre</div>
                <div className="col-1 ">Price</div>
                <div className="col-2 ">Best Seller</div>
                <div className="col-2 ">New Arrival</div>
            </div>
            {books.map((v,index)=><div className="row" key={index}>
                
            <div className="col-2 border"><Link to={`/book/${v.bookid}`}>{v.name}</Link></div>
                <div className="col-2 border">{v.author}</div>
                <div className="col-1 border">{v.language}</div>
                <div className="col-2 border">{v.genre}</div>
                <div className="col-1 border">{v.price}</div>
                <div className="col-2 border">{v.bestseller}</div>
                <div className="col-2 border">{v.newarrival}</div>
            </div>)}
            <div className="row">
                <div className="col-2">
                {pageNumber>1?<button className="btn btn-success"onClick={()=>this.handlePage(-1)}>Prev</button>:""}
                </div>
                <div className="col-8"></div>
                <div className="col-2">
                {books.length<numOfItems?"":<button className="btn btn-success"onClick={()=>this.handlePage(+1)}>Next</button>}
                </div>
            </div>
            </div>
            </div>
        </div>);
    }
}
import React from "react";
import http from "./httpService.js";
export default class AddBook extends React.Component{
    state={
        data:{name:"",author:"",description:"",genre:"",year:"",price:"",
        publisher:"",blurb:"",review:"",avgrating:"",language:"",
        bestseller:"",newarrival:""},
        languages:["Latin", "English", "French", "Others"],
        genres:["Fiction","Children","Mystery", "Management"],
        arr:[{
            display:"Yes",
            value:"Yes",
        },{
            display:"No",
            value:"No",
        }],
        error:{},
    };
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1= {...this.state};
        s1.data[input.name]=input.value;
        this.handleValidate(e);
        this.setState(s1);
    }
    postData=(url,obj)=>{
        let response = http.post(url,obj);
        this.props.history.push("/books");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let errors = this.validateForm();
        if(this.isValid(errors)){
            this.postData("/booksapp/book",this.state.data);
        }
        else{
            let s1 = {...this.state};
            s1.error = errors;
            this.setState(s1);
        }
    }
    isValid=(errors)=>{
        let keys = Object.keys(errors);
        let count =  keys.reduce((acc,curr)=>(errors[curr]?acc+1:acc),0);
        return count==0;
    }
    handleValidate=(e)=>{
        let{currentTarget:input}=e
        let s1 = {...this.state};
        switch (input.name){
            case "name": s1.error.name = this.validateName(input.value);break;
            case "author":s1.error.author=this.validateAuthor(input.value); break;
            case "description":s1.error.description = this.validateDesc(input.value);break;
            case "year":s1.error.year = this.validateYear(input.value);break;
            case "price" : s1.error.price = this.validatePrice(input.value);break;
            case "publisher":s1.error.publisher =this.validatePublisher(input.value);break;
            case "blurb" : s1.error.blurb = this.validateBlurb(input.value);break;
            case "review":s1.error.review =this.validateReview(input.value);break;
            case "avgrating":s1.error.avgrating = this.validateRating(input.value);break;
            case "genre":s1.error.genre = this.validateGenre(input.value);break;
            case "language": s1.error.language = this.validateLanguage(input.value);break;
            case "bestseller":s1.error.bestseller = this.validateBestSeller(input.value);break;
            case "newarrival":s1.error.newarrival = this.validateNewArrival(input.value);break;
            default : break;
        }
        this.setState(s1);
    }
    validateForm=()=>{
   let {name,author,description,year,price,publisher,blurb,review,avgrating,genre,language,bestseller,newarrival}=this.state.data;
   let errors={};
   errors.name=this.validateName(name);
   errors.author=this.validateAuthor(author);
   errors.description=this.validateDesc(description);
   errors.year = this.validateYear(year);
   errors.price = this.validatePrice(price);
   errors.publisher = this.validatePublisher(publisher);
   errors.blurb = this.validateBlurb(blurb);
   errors.review = this.validateReview(review);
   errors.avgrating = this.validateRating(avgrating);
   errors.genre = this.validateGenre(genre);
   errors.language = this.validateLanguage(language);
   errors.bestseller = this.validateBestSeller(bestseller);
   errors.newarrival = this.validateNewArrival(newarrival);
   return errors;
    }
    validateName=(name)=>
    !name?"Please Enter Book Name":"";
    validateAuthor=(author)=>
    !author?"Please Enter Author Name of the Book":""
    validateDesc=(desc)=>
    !desc?"Please Enter Description of the Book":"";
    validateYear=(year)=>
    !year?"Please Enter Year of the Book":"";
    validatePrice=(price)=>
    !price?"Please Enter Price":"";
    validatePublisher=(publisher)=>
    !publisher?"Please Enter Publisher of the Book":"";
    validateBlurb=(blurb)=>
    !blurb?"Please Enter Blurb of the Book":"";
    validateReview=(review)=>
    !review?"Please Enter Review of the Book":"";
    validateRating=(rating)=>
    !rating?"Please Enter Rating of the Book":"";
    validateGenre=(genre)=>
    !genre?"Please Select Genre of the Book":"";
    validateLanguage = (language)=>
    !language?"Please Select Language of the Book":"";
    validateBestSeller = (bestseller)=>
    !bestseller?"Please Choose Best Seller":"";
    validateNewArrival=(newarrival)=>
    !newarrival?"Please Choose New Arrival":""
    
    
    render(){
        const{languages,genres,arr,error}=this.state;
        const {name,author,description,year,price,publisher,blurb,review,avgrating,genre,language,bestseller,newarrival}=this.state.data;
        return <div className="container my-2 mx-4 bg-light border text-center">
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Name:-</label>
                <div className="col-sm-10">
                <input type="text" name="name" className="form-control" value={name} 
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
             {error.name?<span className="text-danger">{error.name}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Aurthor:-</label>
                <div className="col-sm-10">
                <input type="text" name="author" className="form-control" value={author} 
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
          {error.author?<span className="text-danger">{error.author}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Description:-</label>
                <div className="col-sm-10">
                <input type="text" name="description" className="form-control" value={description}
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
              {error.description?<span className="text-danger">{error.description}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Blurb:-</label>
                <div className="col-sm-10">
                <input type="text" name="blurb" className="form-control" value={blurb}
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
              {error.blurb?<span className="text-danger">{error.blurb}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Review:-</label>
                <div className="col-sm-10">
                <input type="text" name="review" className="form-control" value={review}
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
              {error.review?<span className="text-danger">{error.review}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Price:-</label>
                <div className="col-sm-10">
                <input type="text" name="price" className="form-control" value={price} 
                onBlur={this.handleValidate} onChange={this.handleChange}/>
              {error.price?<span className="text-danger">{error.price}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Year:-</label>
                <div className="col-sm-10">
                <input type="text" name="year" className="form-control" value={year}
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
              {error.year?<span className="text-danger">{error.year}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Publisher:-</label>
                <div className="col-sm-10">
                <input type="text" name="publisher" className="form-control" value={publisher}
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
              {error.publisher?<span className="text-danger">{error.publisher}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Rating:-</label>
                <div className="col-sm-10">
                <input type="text" name="avgrating" className="form-control" value={avgrating}
                onBlur={this.handleValidate} onChange={this.handleChange}/> 
              {error.rating?<span className="text-danger">{error.rating}</span>:""} 
            </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Genre:-</label>
                <div className="col-sm-10">
                    <select className="form-control" name="genre" value={genre} onBlur={this.handleValidate} onChange={this.handleChange}>
                        <option value="">Select Genre</option>
                        {genres.map(v=><option key={v}>{v}</option>)}
                    </select>
              {error.genre?<span className="text-danger">{error.genre}</span>:""} 
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Language:-</label>
                <div className="col-sm-10">
                    <select className="form-control" name="language" value={language} onBlur={this.handleValidate} onChange={this.handleChange}>
                        <option value="">Select Language</option>
                        {languages.map(v=><option key={v}>{v}</option>)}
                    </select>
              {error.language?<span className="text-danger">{error.language}</span>:""} 
                </div>
            </div>
            <div className="form-check form-check-inline">
                <label className="font-weight-bold">Best Seller:-</label>
                
                    {arr.map(v=><div><input type="radio" className="form-check-input" name="bestseller" value={v.value} 
                    onBlur={this.handleValidate} checked={bestseller==v.value} onChange={this.handleChange}/>
                    <label className="form-check-label">{v.display}</label></div>
                    )}
            </div><br/>
            {error.bestseller?<span className="text-danger">{error.bestseller}</span>:""} <br/>
            <div className="form-check form-check-inline row">
                <label className="font-weight-bold">New Arrival:-</label>
                    {arr.map(v=><div><input type="radio" className="form-check-input" name="newarrival" value={v.value}
                    onBlur={this.handleValidate} checked={newarrival==v.value} onChange={this.handleChange}/>
                    <label className="form-check-label">{v.display}</label></div>
                    )}
            </div><br/>
            {error.newarrival?<span className="text-danger">{error.newarrival}</span>:""} 
            <div className="text-center">
                <button className="btn btn-primary"onClick={this.handleSubmit} disabled={!this.isFormValid()}>Create Book</button>
            </div>
        </div>
    }
    isFormValid=()=>{
        let errors=this.validateForm();
        return this.isValid(errors);
       // return true;
    }
}
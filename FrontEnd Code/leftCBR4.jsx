import React from "react";
export default class LeftCBR4 extends React.Component{
    makeCB=(arr,value,name,label,arr1)=>(
        <React.Fragment>
            <label className="font-weight-bold">{label}</label>
            {arr.map(v=><div className="form-check"key={v}>
                <input type="checkbox" className="form-check-input" name={name} value={v}
                checked={value.findIndex(a=>a===v)>=0} onChange={this.handleChange}/>
                <label className="form-check-label">{v}({arr1.map(a=>a.refineValue===v?a.totalNum:"")})</label>
            </div>)}
        </React.Fragment>
    );
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let opt = {...this.props.option};
        opt[input.name]=this.updateCB(opt[input.name],input.checked,input.value);
        this.props.onOptionChange(opt);
    }
    updateCB=(inpVal,checked,value)=>{
        let inpArr = inpVal?inpVal.split(","):[];
        if(checked) inpArr.push(value);
        else{
            let index = inpArr.findIndex(v=>v===value);
            if(index>=0){
                inpArr.splice(index,1);
            }
        }
        return inpArr.join(",");
    }
    render(){
        const{bestseller="",language=""}=this.props.option;
        const{lang,bestSell,best,lg}=this.props;
       return<div className="row">
           <div className="col-12">
               {this.makeCB(bestSell,bestseller.split(","),"bestseller","Best Seller",best)}
               {this.makeCB(lang,language.split(","),"language","Language",lg)}

           </div>
       </div> 
    }
}
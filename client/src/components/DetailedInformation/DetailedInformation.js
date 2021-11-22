import React, { Fragment } from 'react';
import './detailedInformation.css';

const Attr = (items)=>{
   
    return(
        <div className="attr">
            {
                items.item.map(({name})=><p>{name}</p>)
            }
        </div>
    );
};
const Value = (items)=>{

    return(
        <div className="value"> 
            {
                items.item.map(({val})=><p>{val}</p>)
            }
        </div>
    );
};


const DetailedInformtaion = (props) => {
    
    return(
            <div className="content">
                <h3 className="title">{props.title}</h3>
                <Attr item={props.items}></Attr>
                <Value item={props.items}></Value>                          
            </div>        
    );

};

export default DetailedInformtaion;
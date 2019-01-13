import React from 'react';
import imageUrl from './tempory-images/1.png';
import "./index.css"

class Display extends React.Component{
    render(){
        return(
            <div>
                <img src={imageUrl} width="95%"></img>
            </div> 
        )
    }
}

export default Display;
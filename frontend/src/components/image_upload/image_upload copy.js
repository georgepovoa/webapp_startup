import React from 'react';

import ReactCrop from 'react-image-crop'
import CanvasDraw from "react-canvas-draw";


// http://jsfiddle.net/ArtBIT/WUXDb/1/ olhar essa opcao dps

class Image_upload extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            imagesrc:null,
            crop:{
              
            }
            

        }
    }



    async componentDidMount() {
        
        this.setState({

        })
    }
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({imagesrc: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);

        }
      }
    
    handleOnCropChange=(crop) =>{

      this.setState({crop})
    }

    handleImageLoaded = (image) =>{
      console.log(image)
    }

    handleOnCropComplete = (crop,pixelCrop)=>{
      console.log(crop,pixelCrop)
    }

    
    render() {
        const imagesrc = this.state.imagesrc
       

        return <div>
            <input type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>
        
            
            {imagesrc?<ReactCrop src = {imagesrc} 
            crop = {this.state.crop} 
            onChange= {this.handleOnCropChange}
            onImageLoaded = {this.handleImageLoaded}
            onComplete = {this.handleOnCropComplete}
            
            /> :<></>}
            
            </div>
        

    }
    
}

export default Image_upload;
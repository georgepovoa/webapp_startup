import React from 'react';

import ReactCrop from 'react-image-crop'
import CanvasDraw from "react-canvas-draw";
import cookie from "react-cookies";


// http://jsfiddle.net/ArtBIT/WUXDb/1/ olhar essa opcao dps

class Image_upload extends React.Component {
  state = {
    original_img:"",
    src: null,
    muda_lateral :false,
    width_original:100,
    height_original:100,
    teste_width:100,
    teste_height:100,
    crop: {
      unit: '%',
      width: 100,
      height:30,
    },
    TESTE_MALUCO :""
  };
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const testando = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result,original_img:e.target.files })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState({crop: {
        unit: '%',
        width: 100,
        height:30,
      }})
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    this.setState({
      width_original:image.naturalWidth,
      height_original:image.naturalHeight,
      teste_height:canvas.height,
      teste_width:canvas.width
    })

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        'image/jpeg',
        1
      );
      this.setState({TESTE_MALUCO:canvas.toDataURL("image/jpeg", 1.0)})

    });
  }
  

  

  render() {
    //Usage example:
    
    
    const { crop, croppedImageUrl, src } = this.state;
    const url = croppedImageUrl;
    var file
fetch(url)
  .then(res => res.blob())
  .then(blob => {
    file = new File([blob], "File name",{ type: "image/png" })
  })

    return (
      
      <div className="App">

          <input className='upload-image-input-file' type="file" accept="image/*" onChange={this.onSelectFile} enctype="multipart/form-data" />
          <div className='upload-image-master'>
        <div className='testeimagemsize'>
        {src && (
                    
            <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            keepSelection = "true"
            
          />

        )}
        </div>
        <div className='testeimagemsize'>
        {croppedImageUrl && (
           
          <img alt="Crop"  src={croppedImageUrl}/>
          
        )}
        </div>
        </div>

        <form  action = "/imagem-cortada" method = "post" >
        <input
          type="hidden"
          value={cookie.load("csrftoken")}
          name="csrfmiddlewaretoken"
        />
          
          <input name = "imagem" type="hidden" value={this.state.TESTE_MALUCO}/>
          <input name = "width_crop" type="hidden" value={this.state.teste_width}/>
          <input name = "height_crop" type="hidden" value={this.state.teste_height}/>

          <button type="submit" value="submit" >Enviar</button>
          

        </form>
        <button onClick={this.handleSubmission}>Submit</button>

        {console.log(crop)}
        {console.log(croppedImageUrl)}
        {console.log(this.state.original_img)}
        {console.log(this.state.width_original)}
        {console.log(this.state.height_original)}
        {console.log(file)}
        {console.log(this.state.TESTE_MALUCO)}
        
        

      
      </div>
      
     
    );
  }
}

export default Image_upload;
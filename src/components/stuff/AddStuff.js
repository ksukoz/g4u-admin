import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class AddStuff extends Component {
  state = {
    stuffPerson: {
      name: '',
      surname: '',
      patronymic: '',
      type_id: ''
    },
    image: null,
    readyImage: null,
    crop: {
      x: 20,
      y: 10,
      width: 30,
      height: 10,
      aspect: 1/1
    }   
  }

  onChange = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", () => {
      this.setState({
        image: reader.result
      })
    }, false);    
  }

  getCroppedImg = () => {

    let img = new Image();
    let crop = this.state.crop;
    img.src = this.state.image;
    const targetX = img.width * crop.x / 100;
    const targetY = img.height * crop.y / 100;
    const targetWidth = img.width * crop.width / 100;
    const targetHeight = img.height * crop.height / 100;

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    this.setState({readyImage: canvas.toDataURL('image/jpeg')})

    return canvas.toDataURL('image/jpeg');
  }

  imageLoaded = crop => {
    this.setState({ crop });
  }

  onChangeHandler = e => {

  }

  onSubmitHandler = e => {

  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input 
            type="text" 
            name="name" 
            value={this.state.name} 
            onChange={this.onChangeHandler}
             placeholder='Имя'
            />
          <input 
            type="text" 
            name="surname" 
            value={this.state.surname} 
            onChange={this.onChangeHandler}
             placeholder='Фамилия'
            />
          <input 
            type="text" 
            name="patronymic" 
            value={this.state.patronymic} 
            onChange={this.onChangeHandler}
             placeholder='Отчество'
            />
          {/* <select name="type_id"defaultValue={}>

          </select> */}
          <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler}/>
        </form>


        {this.state.readyImage !== null ? (<img style={{width: '100px'}} src={this.state.readyImage}/>) : ''}
<input ref='file' type='file' onChange={this.onChange} />
 
 {

     this.state.image &&

     <div>
         <ReactCrop 
             ref='crop'
             src={this.state.image}
             crop={this.state.crop}
             onChange={this.imageLoaded}
             onComplete={this.getCroppedImg}
         />

         <button onClick={this.crop}>Crop</button>
         <button onClick={this.clear}>Clear</button>
     </div>

 }

 {
     this.state.previewUrl &&

     <img src={this.state.previewUrl} />
 }
      </div>
    )
  }
}

export default AddStuff;
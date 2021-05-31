import React from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./index.css";

const imgUrl =
  "https://www.hospital-mmk.ru/wp-content/uploads/2020/08/1785dff58a020e0fab4416747a9056f1.jpg";

function Button({ children, ...args }) {
  return (
    <button className="Button" {...args}>
      {children}
    </button>
  );
}


export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSize: {},
        currentEdit: {
        guid: "",
        image: imgUrl,
        brightness: "100",
        saturate: "100",
        contrast: "100",
        sepia: "0",
        rotate_x: "0",
        rotate_y: "0",
        rotate_z: "0",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        blur: "0",
        text: "",
        textcolor: "#000",
        fontsize: "20",
        text_x: "0",
        text_y: "0",
        image_format: "jpg"
      },
      filterSettings: [
        {
          id: 1,
          heading: "Яркость",
          property: "brightness",
          default: "100",
          min: "0",
          max: "150"
        },
        {
          id: 2,
          heading: "Насыщенность",
          property: "saturate",
          default: "100",
          min: "0",
          max: "150"
        },
        {
          id: 3,
          heading: "Контраст",
          property: "contrast",
          default: "100",
          min: "50",
          max: "150"
        },
        {
          id: 4,
          heading: "Сепия",
          property: "sepia",
          default: "0",
          min: "0",
          max: "1",
          step: "1"
        }
      ],
      rotationSettings: [
        {
          id: 5,
          heading: "Отразить по вертикали",
          property: "rotate_x",
          default: "0",
          step:"180",
          min: "0",
          max: "180"
        },
        {
          id: 6,
          heading: "Отразить по горизонтали",
          property: "rotate_y",
          default: "0",
          step:"180",
          min: "0",
          max: "180"
        },
        {
          id: 7,
          heading: "Поворот",
          property: "rotate_z",
          default: "0",
          min: "0",
          max: "360"
        }
      ],
      sizeSettings: [],
      blurSettings: [
        {
          id: 12,
          heading: "Гауссово размытие",
          property: "blur",
          default: "0",
          min: "0",
          max: "10",
          step: "0.01"
        }
      ],
      textSettings: [
        {
          id: 13,
          property: "text",
          text: ""
        },
        {
          id: 14,
          property: "textcolor",
          default: "#000"
        },
        {
          id: 15,
          property: "fontsize"
        },
        {
          id: 16,
          property: "text_x"
        },
        {
          id: 17,
          property: "text_y"
        }
      ]
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.setSizeSettings = this.setSizeSettings.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.download = this.download.bind(this);
    this.changeText = this.changeText.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.resetRotation = this.resetRotation.bind(this);
    this.resetBlur = this.resetBlur.bind(this);
    this.resetSize = this.resetSize.bind(this);
    this.resetBlur = this.resetBlur.bind(this);
    this.selectFormat = this.selectFormat.bind(this);
  }
  
  onImgLoad(e) {
    this.setState({imageSize: { 
      imgHeight: e.target.offsetHeight,
      imgWidth: e.target.offsetWidth
    }});
    this.setSizeSettings(e.target.offsetHeight, e.target.offsetWidth);
  }

    
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
      function createGuid() {
          function _p8(s) {
              var p = (Math.random().toString(16) + "000000000").substr(2, 8);
              return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
          }
          return _p8() + _p8(true) + _p8(true) + _p8();
      }
      reader.onloadend = () => {
          var guid = createGuid(); 
          this.changeSettings({
              guid: guid
          });

      let currentEdit = { ...this.state.currentEdit, image: reader.result};
      this.setState({currentEdit});
      this.setState({ imageSize: { 
        imgHeight: file.offsetHeight,
        imgWidth: file.offsetWidth
      } });
      this.setSizeSettings(file.offsetHeight, file.offsetWidth);
    }
    reader.readAsDataURL(file)
  }

  setSizeSettings(height, width) {
    this.setState({sizeSettings: [
      {
        id: 8,
        heading: "Сверху",
        property: "top",
        default: "0",
        min: "0",
        max: height
      },
      {
        id: 9,
        heading: "Справа",
        property: "right",
        default: "0",
        min: "0",
        max: width
      },
      {
        id: 10,
        heading: "Снизу",
        property: "bottom",
        default: "0",
        min: "0",
        max: height
      },
      {
        id: 11,
        heading: "Слева",
        property: "left",
        default: "0",
        min: "0",
        max: width
      }
    ]});
  }

  changeSettings(settings) {
    let currentEdit = { ...this.state.currentEdit, ...settings };
    this.setState({ currentEdit });
  }

  handleChange(e) {
    let currentEdit = {
      ...this.state.currentEdit,
      [e.target.name.toLowerCase()]: e.target.value
    };
    this.setState({ currentEdit });
  }

  changeText(e) {
    let currentEdit = {
      ...this.state.currentEdit,
      text: e.target.value
    };
    this.setState({ currentEdit });
    this.setState({ text: e.target.value });
  }

  resetFilters(e) {
    this.changeSettings({
      brightness: "100",
      saturate: "100",
      contrast: "100",
      sepia: "0"
    });
  }

  resetRotation(e) {
    this.changeSettings({
      rotate_x: "0",
      rotate_y: "0",
      rotate_z: "0"
    });
  }

  resetSize(e) {
    this.changeSettings({
      top: "0",
      right: "0",
      bottom: "0",
      left: "0"
    });
  }

  resetBlur(e) {
    this.changeSettings({
      blur: "0"
    });
  }

  selectFormat(e) {
    let currentEdit = {
      ...this.state.currentEdit,
      image_format: e.target.id
    };
    this.setState({currentEdit}, this.download)
  }

    download(e) {

      fetch('/Download', {
          method: 'POST',   
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.state.currentEdit)
      }).then(response => response.blob())
          .then(blob => {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
              a.download = "image." + this.state.currentEdit.image_format;
              document.body.appendChild(a);
              a.click();
              a.remove();        
          });


  }

  addInputs(resetFunction, currentSettings) {
    return (
      <div className="inputs">
        <Button className="resetButton" onClick={resetFunction}>
          По умолчанию
        </Button>
        {currentSettings.map((setting) => (
          <form key={setting.id}>
            <h3>{setting.heading}</h3>
            <input
              type="range"
              name={setting.property}
              value={this.state.currentEdit[setting.property]}
              step={setting.step}
              min={setting.min}
              max={setting.max}
              onChange={this.handleChange}
            />
            <input
              type="number"
              name={setting.property}
              value={this.state.currentEdit[setting.property]}
              step={setting.step}
              min={setting.min}
              max={setting.max}
              onChange={this.handleChange}
            />
          </form>
        ))}
      </div>
    );
  }

  render() {
    const {
      brightness,
      saturate,
      contrast,
      sepia,
      rotate_x,
      rotate_y,
      rotate_z,
      top,
      right,
      bottom,
      left,
      blur,
      textcolor,
      fontsize,
      text_x,
      text_y,
    } = this.state.currentEdit;
    if (sepia > 0)
      var filter = `sepia() brightness(${brightness*0.8}%) saturate(${saturate*1.7}%) contrast(${contrast*1.3}%) blur(${blur}px)`;
    else var filter = `blur(${blur}px) brightness(${brightness}%) saturate(${saturate}%) contrast(${contrast}%)`;
    const imgStyle = {
      clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`,
      transform: `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) rotateZ(${rotate_z}deg)`,
      filter: filter
    };
    const textStyle = {
      fontFamily: "Georgia, serif",
      fontSize: `${fontsize}px`,
      color: `${textcolor}`,
      position: "relative",
      display: "inline-block",
      margin: "0",
      padding: "0",
      top: `${text_y}px`,
      left: `${text_x}px`
    };

    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>
              <svg className="icons" viewBox="0 0 512 512">
                <use xlinkHref="Icons/crop.svg#Capa_1" />
              </svg>
            </Tab>
            <Tab>
              <svg className="icons" viewBox="0 0 512 512">
                <use xlinkHref="Icons/refresh-button.svg#Capa_1" />
              </svg>
            </Tab>
            <Tab>
              <svg className="icons" viewBox="0 0 512 512">
                <use xlinkHref="Icons/text.svg#Capa_1" />
              </svg>
            </Tab>
            <Tab>
              <svg className="icons" viewBox="0 0 512 512">
                <use xlinkHref="Icons/magic-wand.svg#Capa_1" />
              </svg>
            </Tab>
            <Tab>
              <svg className="icons" viewBox="0 0 512 512">
                <use xlinkHref="Icons/blur.svg#Layer_1" />
              </svg>
            </Tab>
            <Tab>
              <svg className="icons" viewBox="0 0 512 512">
                <use xlinkHref="Icons/direct-download.svg#bold" />
              </svg>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Обрезать</h2>
              {this.addInputs(this.resetSize, this.state.sizeSettings)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Повернуть</h2>
              {this.addInputs(this.resetRotation, this.state.rotationSettings)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Текст</h2>
              <div className="inputs">
                <textarea
                  placeholder="Type text here!"
                  className="textarea"
                  value={this.state.text}
                  onChange={this.changeText}
                />
                <form key="13">
                  <h3>Размер шрифта</h3>
                  <input
                    type="range"
                    name={this.state.textSettings[2].property}
                    value={
                      this.state.currentEdit[this.state.textSettings.fontsize]
                    }
                    step="0.5"
                    min="2"
                    max="100"
                    onChange={this.handleChange}
                  />
                  <input
                    type="number"
                    name={this.state.textSettings[2].property}
                    value={
                      this.state.currentEdit[this.state.textSettings.fontsize]
                    }
                    step="0.5"
                    onChange={this.handleChange}
                  />
                </form>
                <form key="14">
                  <h3>Цвет</h3>
                  <input
                    id="textColor"
                    type="color"
                    name="textcolor"
                    value={
                      this.state.currentEdit[this.state.textSettings.textColor]
                    }
                    onChange={this.handleChange}
                    list="colorList"
                  />
                </form>
                <form key="15">
                  <h3>Положение по горизонтали</h3>
                  <input
                    type="range"
                    name={this.state.textSettings[3].property}
                    value={
                      this.state.currentEdit[this.state.textSettings.text_x]
                    }
                    step="1"
                    default="0"
                    min="0"
                    max={this.state.imageSize.imgWidth}
                    onChange={this.handleChange}
                  />
                </form>
                <form key="16">
                  <h3>Положение по вертикали</h3>
                  <input
                    type="range"
                    name={this.state.textSettings[4].property}
                    value={
                      this.state.currentEdit[this.state.textSettings.text_y]
                    }
                    step="1"
                    default="0"
                    min={-fontsize/2}
                    max={this.state.imageSize.imgHeight - fontsize}
                    onChange={this.handleChange}
                  />
                </form>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Эффекты</h2>
              {this.addInputs(this.resetFilters, this.state.filterSettings)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Размытие</h2>
              {this.addInputs(this.resetBlur, this.state.blurSettings)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Скачать изображение</h2>
              <Button className="downloadButton" id="jpg" onClick={(e)=>this.selectFormat(e)}>
                В формате jpeg
              </Button>
              <Button className="downloadButton" id="png" onClick={(e)=>this.selectFormat(e)}>
                В формате png
              </Button>
            </div>
          </TabPanel>
        </Tabs>
        <div className="content">
          <div className="input_wrapper">
            <input type="file" name="file" id="input_file" className="input_file" accept="image/png, image/jpeg" onChange={(e)=>this.handleImageChange(e)}/>
            <label htmlFor="input_file" className="input_file-button">
              <span className="input_file-icon-wrapper"><img className="input_file-icon" src="Icons/upload.svg#bold" alt="Выбрать файл" width="25" fill="white"/></span>
              <span className="input_file-button-text">Выберите файл</span>
            </label>
          </div>        
          <img
            className="MainImg"
            onLoad={(e) => this.onImgLoad(e)}
            style={imgStyle}
            alt="То, что обрабатывается"
            src={this.state.currentEdit.image}
          />
          <div style={{
            width:`${this.state.imageSize.imgWidth}px`, 
            height: `${this.state.imageSize.imgHeight}px`,
            transform: `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) rotateZ(${rotate_z}deg)`
            }}>
            <p style={textStyle} className="Text">{this.state.text}</p>
          </div>
          
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.querySelector("#root"));

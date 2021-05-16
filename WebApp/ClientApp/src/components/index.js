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
      image: imgUrl,
      currentEdit: {
        brightness: "1",
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
        text_x: "50",
        text_y: "50"
      },
      filterSettings: [
        {
          id: 1,
          property: "brightness",
          default: "1",
          min: "0",
          max: "3",
          step: "0.01"
        },
        {
          id: 2,
          property: "saturate",
          default: "100",
          min: "0",
          max: "200"
        },
        {
          id: 3,
          property: "contrast",
          default: "100",
          min: "50",
          max: "150"
        },
        {
          id: 4,
          property: "sepia",
          default: "0",
          min: "0",
          max: "100"
        }
      ],
      rotationSettings: [
        {
          id: 5,
          property: "rotate_x",
          default: "0",
          min: "0",
          max: "180"
        },
        {
          id: 6,
          property: "rotate_y",
          default: "0",
          min: "0",
          max: "180"
        },
        {
          id: 7,
          property: "rotate_z",
          default: "0",
          min: "0",
          max: "360"
        }
      ],
      sizeSettings: [
        {
          id: 8,
          property: "top",
          default: "0",
          min: "0",
          max: "100"
        },
        {
          id: 9,
          property: "right",
          default: "0",
          min: "0",
          max: "100"
        },
        {
          id: 10,
          property: "bottom",
          default: "0",
          min: "0",
          max: "100"
        },
        {
          id: 11,
          property: "left",
          default: "0",
          min: "0",
          max: "100"
        }
      ],
      blurSettings: [
        {
          id: 12,
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
    this.handleImageChange = this.handleImageChange.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeText = this.changeText.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.resetRotation = this.resetRotation.bind(this);
    this.resetBlur = this.resetBlur.bind(this);
    this.resetSize = this.resetSize.bind(this);
    this.resetBlur = this.resetBlur.bind(this);
  }
  
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ image: reader.result });
      this.setState({ imageSize: {imgHeight: file.offsetHeight} });
      /*let imgWidth = {...this.state.imageSize.imgWidth, reader.result.imgWidth}
      this.setState({imgWidth: reader.result.imgWidth})*/
      /*imgWidth = file.width;
      imgHeight = file.height;*/
    }

    reader.readAsDataURL(file)
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

  changeText(event) {
    this.setState({ text: event.target.value });
  }

  resetFilters(e) {
    this.changeSettings({
      brightness: "1",
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

  addInputs(resetFunction, currentSettings) {
    return (
      <div className="inputs">
        <Button className="resetButton" onClick={resetFunction}>
          По умолчанию
        </Button>
        {currentSettings.map((setting) => (
          <form key={setting.id}>
            <h3>{setting.property}</h3>
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
    const imgStyle = {
      width: "auto",
      height: "auto",
      clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
      transform: `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) rotateZ(${rotate_z}deg)`,
      filter: `blur(${blur}px) brightness(${brightness}) saturate(${saturate}%) contrast(${contrast}%) sepia(${sepia}%)`
    };
    const textStyle = {
      fontFace: "Calibri",
      fontSize: `${fontsize}px`,
      fontWeight: "bold",
      color: `${textcolor}`,
      position: "absolute",
      bottom: `${text_y}%`,
      left: `${text_x}%`
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
                <use xlinkHref="Icons/file.svg#Glyph" />
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
                  <h3>Font size</h3>
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
                  <h3>Color</h3>
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
                  <h3>Font position X</h3>
                  <input
                    type="range"
                    name={this.state.textSettings[3].property}
                    value={
                      this.state.currentEdit[this.state.textSettings.text_x]
                    }
                    step="0.05"
                    min="0"
                    max="100"
                    onChange={this.handleChange}
                  />
                </form>
                <form key="16">
                  <h3>Font pozition Y</h3>
                  <input
                    type="range"
                    name={this.state.textSettings[4].property}
                    value={
                      this.state.currentEdit[this.state.textSettings.text_y]
                    }
                    step="0.05"
                    min="0"
                    max="100"
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
              <h2 className="panel-title">Формат изображения</h2>
              <Button className="formatButton">
                Преобразовать в jpeg
              </Button>
              <Button className="formatButton">
                Преобразовать в png
              </Button>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Скачать</h2>
              <Button className="downloadButton">
                Скачать изображение
              </Button>
            </div>
          </TabPanel>
        </Tabs>
        <div className="content">
          <div className="input_wrapper">
            <input type="file" name="file" id="input_file" className="input_file" accept="image/png, image/jpeg" onChange={(e)=>this.handleImageChange(e)}/>
            <label for="input_file" className="input_file-button">
              <span className="input_file-icon-wrapper"><img className="input_file-icon" src="Icons/upload.svg#bold" alt="Выбрать файл" width="25" fill="white"/></span>
              <span className="input_file-button-text">Выберите файл</span>
            </label>
          </div>        
          <img
            className="MainImg"
            style={imgStyle}
            alt="то что обрабатывается"
            src={this.state.image}
          />
          <p style={textStyle}>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.querySelector("#root"));

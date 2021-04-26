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

function getImgSize(imgSrc) {
  let newImg = new Image();
  newImg.onload = function () {
    return {
      height: newImg.height,
      width: newImg.width
    };
  };
  newImg.src = imgSrc;
  return newImg.onload();
}

const size = getImgSize(imgUrl);

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
        blur: "0"
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
      },
    ],
    sizeSettings: [
      {
        id: 8,
        property: "top",
        default: "0",
        min: "0",
        max: `${size.height}`
      },
      {
        id: 9,
        property: "right",
        default: "0",
        min: "0",
        max: `${size.width}`
      },
      {
        id: 10,
        property: "bottom",
        default: "0",
        min: "0",
        max: `${size.height}`
      },
      {
        id: 11,
        property: "left",
        default: "0",
        min: "0",
        max: `${size.width}`
      }
    ],
    blurSettings:[
      {
        id: 12,
        property: "blur",
        default: "0",
        min: "0",
        max: "10",
        step: "0.01"
      }
    ]
    };
    this.changeImage = this.changeImage.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.resetRotation = this.resetRotation.bind(this);
    this.resetBlur = this.resetBlur.bind(this);
    this.resetSize = this.resetSize.bind(this);
    this.resetBlur = this.resetBlur.bind(this);
  }

  changeImage(imageUrl) {
    this.setState({ image: imageUrl });
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
      blur: "0",
    });
  }


  addInputs(resetFunction, currentSettings) {
    return (
      <div className="inputs">
              <Button className="resetButton" onClick={resetFunction}>По умолчанию</Button>
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
    )
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
      blur
    } = this.state.currentEdit;

    const imgStyle = {
      clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`,
      transform: `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) rotateZ(${rotate_z}deg)`,
      filter: `blur(${blur}px) brightness(${brightness}) saturate(${saturate}%) contrast(${contrast}%) sepia(${sepia}%)`,
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
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2 className="panel-title">Скачать</h2>
            </div>
          </TabPanel>
        </Tabs>
        <div className="content">
          <img
            className="MainImg"
            style={imgStyle}
            alt="то что обрабатывается"
            src={this.state.image}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.querySelector("#root"));

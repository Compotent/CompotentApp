import React from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./index.css";

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
      image:
        "https://www.hospital-mmk.ru/wp-content/uploads/2020/08/1785dff58a020e0fab4416747a9056f1.jpg",
      currentEdit: {
        brightness: "1",
        saturate: "100",
        contrast: "100",
        sepia: "0",
        rotate: "0",
        gaussian: "0",
        radian: "0"
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
      rotationSettings:[
      {
        id: 5,
        property: "rotate",
        default: "0",
        min: "0",
        max: "360",
        step: "1"
      }],
      blurSettings:[
        {
          id: 6,
          property: "gaussian",
          default: "0",
          min: "0",
          max: "10",
          step: "0.01"
        },
        {
          id: 7,
          property: "radial",
          default: "0",
          min: "0",
          max: "1",
          step: "0.01"
        }
      ]
    };
    this.changeImage = this.changeImage.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetDefaults = this.resetDefaults.bind(this);
    this.resetRotation = this.resetRotation.bind(this);
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

  resetDefaults(e) {
    this.changeSettings({
      brightness: "1",
      saturate: "100",
      contrast: "100",
      sepia: "0"
    });
  }

  resetRotation(e) {
    this.changeSettings({
      rotate: "0"
    });
  }

  resetBlur(e) {
    this.changeSettings({
      gaussian: "0",
      radial: "0"
    });
  }


  addInputs(resetFunction, currentSettings) {
    return (
      <div className="inputs">
              <Button onClick={resetFunction}>По умолчанию</Button>
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
      rotate,
      gaussian,
      radial
    } = this.state.currentEdit;

    const imgStyle = {
      transform: `rotate(${rotate}deg)`,
      filter: `brightness(${brightness}) saturate(${saturate}%) contrast(${contrast}%) sepia(${sepia}%) blur(${gaussian}px)`
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
              {this.addInputs(this.resetDefaults, this.state.filterSettings)}

              
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

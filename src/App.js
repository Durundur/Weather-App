import React, { createRef } from 'react'
import  ReactDOM  from 'react-dom'
import './App.css';
import {FiMapPin} from "react-icons/fi";
import Moment from 'react-moment';


class LeftS extends React.Component{
  render(){
    return(
      <div className='left-side padding'>
        <div className='main-info'>
        <h5 className='day'>{<Moment format='dddd' date={this.props.data.data.location.localtime}/>}</h5>
        <span className='date'>{<Moment format='MMMM Do YYYY' date={this.props.data.data.location.localtime}/>}</span>
        <div className='location'>
          <FiMapPin className='loaction-ico'/>
          <span>{`${this.props.data.data.location.name}, ${this.props.data.data.location.country}`}</span>
          
        </div>
      </div>
        <div className='actual-weather-info'>
              <img className='forecast-ico2' src={this.props.data.data.current.condition.icon}></img>
            <span className='temperature'>{this.props.data.data.current.temp_c}°C</span>
            <span className='condition'>{this.props.data.data.current.condition.text}</span>
      </div>  
      </div>
    )
  }
}
class Forecast extends React.Component{
  render(){
    return(
      <div className='forecast-info'>
        <img className='forecast-ico' src={this.props.properties.day.condition.icon}></img>
        <span className='forecast-day'>{<Moment format='ddd' date={this.props.properties.date}/>}</span>
        <span className='forecast-temp'>{this.props.properties.day.avgtemp_c}°C</span>
      </div>
    )
  }
}

class RightS extends React.Component{
  render(){
    return(
      <div className='right-side padding'>
          <div className='specific-info'>
              <div className='detail-container'>
                  <div className='details'>
                    <span className='detail-name'>PRECIPITATION</span>
                    <span className='detail-value'> {this.props.data.data.current.precip_mm} mm</span>
                  </div>
                  <div className='details'>
                    <span className='detail-name'>HUMIDITY</span>
                    <span className='detail-value'> {this.props.data.data.current.humidity} %</span>
                  </div>
                  <div className='details'>
                    <span className='detail-name'>WIND</span>
                    <span className='detail-value'> {this.props.data.data.current.wind_kph} km/h</span>
                  </div>
              </div>
          </div>

          <div className='forecast-container'>
            <Forecast properties={this.props.data.data.forecast.forecastday[0]}/>
            <Forecast properties={this.props.data.data.forecast.forecastday[1]}/>
            <Forecast properties={this.props.data.data.forecast.forecastday[2]}/>
            <Forecast properties={this.props.data.data.forecast.forecastday[2]}/>
          </div>

          <div className='change-loc-bnt'>
              <button className='button'>Refresh</button>
          </div>

      </div>
    )
  }
}

class Widget extends React.Component{
  
  render(){
    return(
      <div className='widget'>
      <LeftS data={this.props.data}/>
      <RightS data={this.props.data}/>
    </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {state: false}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.location = createRef()
  }
  handleSubmit(e){
    e.preventDefault()
    let locationName = this.location.current.value
    if (locationName)
    {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce0cc07bc3364d08963134335211010&q=${locationName}&days=6&aqi=yes&alerts=no`)
      .then((res)=>{
        res.json().then((data)=>{
          if(!res.ok)
          {
            return Promise.reject();
          }
          this.setState({state: true, weather: {data}})
          this.location.current.value = ''
        })
      })
      .catch(error => {
        console.error('There was an error!', error.statusText);
        
     });
    }
    
      
  }

  render(){
    return(
      <div className='app'>
        <form className='search-container'>
        <div className='search-bar'>
            <input type='text' id='location' className='serach-input' autoComplete='off' ref={this.location} required></input>
            <label htmlFor='location' className='search-label'>Location</label>
        </div>
        <input className='button' type='submit' value='Check' onClick={this.handleSubmit}></input> 
        </form>
      {this.state.state && <Widget data={this.state.weather} />}
      </div>
    )
  }
}




class Application extends React.Component{
  render(){
    return (
      <App/>
    )
  }
}
export default Application;

//wynoszenie stanu w góre
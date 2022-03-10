import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const FullCountryInfo = ({data}) => {
  const [weatherData, setWeatherData] = useState()
  
  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeatherData(response.data)
    })
  }, [data.capital])

  if (!weatherData) return <h1>Loading...</h1>

  return (
      <>
        <h1>{data.name.common}</h1>
        <p>{data.capital[0]}</p>
        <p>{data.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(data.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <p>{data.flag}</p>
        <h2>Weather in {data.capital[0]}</h2>
        <p>temperature {weatherData.main.temp}</p>
        <p>wind {weatherData.wind.speed} m/s</p>
        {console.log(weatherData)}
        <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weathericon" />
    </>
  )
}

const ToggleFullInfo = ({data}) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      {isShow ? <FullCountryInfo data={data} /> : <h1>{data.name.common}</h1>}
      <button onClick={() => setIsShow(!isShow)}>{isShow ? 'hide' : 'show'}</button>
    </>
  )
}

const Results = ({apiData, filter}) => {
  return (
    <>
      {apiData.filter(filter).map((data, index) => {
        if (apiData.filter(filter).length === 1) {
          return (
            <FullCountryInfo key={index} data={data} />
          )
        }

        return (
          <ToggleFullInfo key={index} data={data} />
        )
      })}
    </>
  )
}

const App = () => {
  const [apiData, setApiData] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setApiData(response.data)
    })    
  }, [])
  
  const handleFilter = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const filterByCountryName = (countryObject) => {
    if (filterValue === '') return countryObject.name.common

    return countryObject.name.common.toLowerCase().includes(filterValue)
  }

  return (
    <div className="App">
      <input type="text" onChange={handleFilter} />
      {apiData.filter(filterByCountryName).length > 10 ? <h1>Too many results</h1> : <Results apiData={apiData} filter={filterByCountryName}/>}
    </div>
  );
}

export default App;

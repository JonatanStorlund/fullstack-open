import { useState, useEffect } from 'react'
import axios from 'axios'

const FullCountryInfo = ({data}) => {
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
    </>
  )
}

const ToggleFullInfo = ({data}) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      {isShow ? <FullCountryInfo data={data} /> : <h1>{data.name.common}</h1>}
      <button onClick={() => setIsShow(!isShow)}>{isShow ? <h1>hide</h1> : <h1>show</h1>}</button>
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

function App() {
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

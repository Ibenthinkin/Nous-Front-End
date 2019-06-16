import React, {Component} from 'react'
import './App.css';
import apiConfig from './apiConfig'

export default class Outlet extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:[],
      source: this.props.source
    }
  }


  componentDidMount = () => {
    this.getSources()
  }

  getSources = () => {
    const newsSourcesURL = `https://newsapi.org/v2/sources?apiKey=${apiConfig.newsApi}`
      fetch(newsSourcesURL)
      .then(response => response.json())
      .then(data => this.setState({data: data}))
      .then(response=>{console.log(this.state)})
      .catch(error => {console.log(error)})

  }

  handleChange = (event) => {
    this.props.changeSource(event.target.value)
    this.setState({ source: event.target.value});
  // this.props.changeSource(event.target.value)
  // console.log(this.state.value);
}

componentDidUpdate = (prevProps) => {
  if (prevProps !== this.props){
    console.log(this.props)
  }
}


  render(props) {
    if (this.state.data.length < 10){
      return null
    } else {
      return (
        <div className='OutletSelect'>
        <select value={this.state.source} onChange={this.handleChange}>
          >
          {this.state.data.sources.map((source, i) => {
            return (
              <option key={i} value={source.id}>
                {source.name}
              </option>
            );
          })}
        </select>
        </div>
      )
    }

  }

}

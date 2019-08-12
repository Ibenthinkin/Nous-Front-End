import React, {Component} from 'react'

export default class Outlet extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }


  componentDidMount = () => {
    this.getSources()
  }

  getSources = () => {
    const newsSourcesURL = `https://newsapi.org/v2/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      fetch(newsSourcesURL)
      .then(response => response.json())
      .then(data => this.setState({data: data}))
      .then(response=>{console.log(this.state)})
      .catch(error => {console.log(error)})

  }

  handleChange = (event) => {
    this.props.changeSource(event.target.value)

  } 




  render() {
    const {length} = this.state.data;
      return (
        <div>
          { length < 10 
            ? null
          : (
              <div className='OutletSelect'>
                <select value={this.props.source} onChange={this.handleChange}>
                  {this.state.data.sources.map((source, i) => {
                    return (
                      <option key={i} value={source.id}>
                        {source.name}
                      </option>
                    );
                  }
                  )}
                </select>
              </div>
            )
          }
          
        </div>
    )
  }
}
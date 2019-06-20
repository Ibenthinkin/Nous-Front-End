
  import React, { Component } from 'react';
  import apiConfig from './apiConfig'
  import CreatableSelect from 'react-select/creatable';

  export default class Outlet2 extends Component {

    constructor(props){
      super(props)
      this.state = ({
        data:[]
      })
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

      handleChange = (inputValue) => {
        this.props.changeSource(inputValue)
        // this.setState({ source: event.target.value});
      // this.props.changeSource(event.target.value)
      // console.log(this.state.value);
    }



    // handleInputChange = (inputValue: any, actionMeta: any) => {
    //   console.group('Input Changed');
    //   console.log(inputValue);
    //   console.log(`action: ${actionMeta.action}`);
    //   console.groupEnd();
    // };
    render(props) {
      if (this.state.data.length < 10){
        return null
      } else {
          return (
            <CreatableSelect
              className='OutletSelect'
              defaultValue={this.props.source}
              isClearable
              onChange={this.handleChange}
              // onInputChange={this.handleInputChange}
              options={this.state.data.sources}
            />
          );
        }
      }
  }

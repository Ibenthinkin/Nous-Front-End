import React, {Component} from 'react';
import './App.css';

export default class Feed extends Component{
  // constructor(){
  //   super()
  //   this.state = {
  //     user:{}
  //   }
  // }

  componentDidMount(){
    this.setState({
      user: (this.props.user)
    })
  }

  getFeed = () => {
    const {sources} = this.state.user

    const url = 'https://newsapi.org/v2/top-headlines'
    console.log(sources.join(','))

    // fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=apiConfig.newsApi`,
    fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=apiConfig.newsApi')
      .then(response => response.json())
        .then((stories) => {
          this.setState({
            stories: stories
          })
        })
  }



  render(){

    return(
      <div>
        {this.state && this.state.user &&
          this.getFeed()

        }
      </div>
    )
  }

}

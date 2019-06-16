import React, {Component} from 'react';
import apiConfig from './apiConfig'
import './Feed.css';
// import TitleCard from './TitleCard'
// import Card from './Card'
import CardsContainer from './CardsContainer'


export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      articlesWithSentiment: []
    }
  }

  componentDidMount = () => {
    this.getArticles()
  }

  getArticles = () => {
    const source = this.props.source
    const newsURL = `https://newsapi.org/v2/everything?`
    fetch(`${newsURL}pageSize=20&sources=${source}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then((articles) => this.setState({articles:articles.articles}))
      .catch(error => {console.log(error)});
  }


  //
  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.source !== prevProps.source) {
  //
  //     this.getArticles()
  //   }
  // }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props){
      this.getArticles()
    }
  }


  render() {

      return (
        <CardsContainer source={this.props.source} changeSource={this.props.changeSource} articles={this.state.articles}/>
      )
    }

}

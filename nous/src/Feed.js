import React, {Component} from 'react';
import apiConfig from './apiConfig'
import './Feed.css';
import TitleCard from './TitleCard'
import Card from './Card'


export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      user: (this.props.users[1]),
      articlesWithSentiment: [],
      source: this.props.source
    }
  }

  componentDidMount = () => {
    this.getArticles()
  }

  getArticles = () => {
    const {source} = this.state
    const newsURL = `https://newsapi.org/v2/everything?`
    fetch(`${newsURL}pageSize=20&sources=${source}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then((articles) => this.setState({articles:articles.articles}))
      .catch(error => {console.log(error)});
  }

  // changeSource = (source) => {
  //   this.setState({source: source})
  // }
  //
  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.source !== prevProps.source) {
  //
  //     this.getArticles()
  //   }
  // }


  render() {

      return (
        <div className="cardsContainer">
          <TitleCard changeSource={this.changeSource} user={this.state.user} source={this.state.source}/>
          {this.state.articles.map((news, i) => {
            return (
              <Card news={news} i={i} source={this.state.source}/>
            );
          })}
        </div>

      )
    }

}

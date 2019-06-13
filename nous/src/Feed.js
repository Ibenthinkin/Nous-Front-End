import React, {Component} from 'react';
import apiConfig from './apiConfig'
import './Feed.css';

export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      user: (this.props.user),
      articlesWithSentiment: [],
      chainLinkComplete: true
    }
  }

  componentDidMount() {
    this.getArticles()
  }

  getArticles = () => {
    const {sources} = this.props.user
    const newsURL = `https://newsapi.org/v2/everything?`
    fetch(`${newsURL}pageSize=10&sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then((articles) => this.setState({articles:articles.articles}))
      .catch(error => {console.log(error)});
  }






    fetchSentiment = async (article) => {
      const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiConfig.meaningApi}&lang=en&url=`
      const delay = t => new Promise(resolve => setTimeout(resolve, t));
          this.setState({chainLinkComplete:false})
          await fetch(`${sentimentURL}${article.url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          })
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            const articleWithSentiment = Object.assign(article, response)
            return articleWithSentiment
          })
          .then(articleWithSentiment => this.setState({
            articlesWithSentiment: [...this.state.articlesWithSentiment, articleWithSentiment]
          }))
           delay(1000).then(() => console.log('Hello'));
    }





  render() {
    if (this.state.articles && this.state.articles.length < 10) {
      return null
    } else {
      return (
        <div className="cardsContainer">
          {this.state.articles.map((news, i) => {
            return (
              <div className="card" key={i}>
                <div className="content">
                  <h3>
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                      {news.title}
                    </a>
                  </h3>
                  <p>{news.description}</p>
                  <div className="author">
                    <p>
                      By <i>{news.author ? news.author : this.props.default}</i>
                    </p>
                  </div>
                </div>
                <div className="image">
                  <img src={news.urlToImage} alt="" />
                </div>
              </div>
            );
          })}
        </div>

      )
    }
  }
}

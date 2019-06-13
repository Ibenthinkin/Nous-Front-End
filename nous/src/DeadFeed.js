import React, {Component} from 'react';
import apiConfig from './apiConfig'
import './App.css';

export default class Feed extends Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      chainLinkComplete: true
    }
  }

  componentDidMount() {
    this.setState({
      user: (this.props.user)
    })
    this.getArticles()
  }

  getArticles = () => {
    const {sources} = this.props.user
    const newsURL = `https://newsapi.org/v2/everything?`
    fetch(`${newsURL}pageSize=10&sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then((articles) => this.mapOverArticles(articles))
  }

  mapOverArticles = (articles) => {
   articles.articles.forEach( (article) => {
     if(this.state.chainLinkComplete === true){
       Promise.all([this.getSummary(article), this.getSentiment]).then(()=>this.getSummary(article))
      // setTimeout(()=>this.getSummary(article),3000)
    }
    // else if (this.state.chainLinkComplete === false) {
    //   setTimeout(()=>this.getSummary(article), 2000)
    //   // setTimeout(()=>Promise.all([this.getSummary(article), this.getSentiment]).then(()=>this.getSummary(article)), 1000)
    // }
   })
 }



  //
  // getSummary = (article) => {
  //   setTimeout(()=>this.setState({chainLinkComplete: false},this.fetchSummary(article) ), 3000)
  // }

  getSummary = async (article) => {
    const summaryURL = `http://api.meaningcloud.com/summarization-1.0?key=${apiConfig.meaningApi}&sentences=5&url=`
    await setTimeout(()=>console.log("somthign"), 1000)

      this.setState({chainLinkComplete:false})
      // debugger
    await fetch(`${summaryURL}${article.url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          const articleWithSummary = Object.assign(article, response)
          return articleWithSummary
        })
        // .then(articleWithSummary=>this.addDelay(articleWithSummary))
        .then(articleWithSummary => this.getSentiment(articleWithSummary))
      }

      // addDelay = (articleWithSummary) =>{
      //   // setTimeout(()=>this.getSentiment(articleWithSummary),1000)
      //   setTimeout(()=>this.getSentiment(articleWithSummary), 3000)
      //
      //
      // }

  getSentiment = async (articleWithSummary) => {
    const delay = t => new Promise(resolve => setTimeout(resolve, t));
    const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiConfig.meaningApi}&lang=en&url=`
    await fetch(`${sentimentURL}${articleWithSummary.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const articleWithSentiment = Object.assign(articleWithSummary, response)
      return articleWithSentiment
    })
    .then(articleWithSentiment => this.setState({
      articles: [...this.state.articles, articleWithSentiment],
      chainLinkComplete: true
    }))
    delay(1000).then(() => console.log('Hello'));
    // debugger
  }

  render() {
    if (this.state.articles && this.state.articles.length < 10) {
      return null
    } else {
      return ( <
        div >
        'something' <
        /div>
      )
    }
  }
}

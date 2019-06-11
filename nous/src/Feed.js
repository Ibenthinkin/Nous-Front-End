import React, {
  Component
} from 'react';
import apiConfig from './apiConfig'
import './App.css';

export default class Feed extends Component {


  componentDidMount() {
    // const promises = [this.getArticles(), this.mapOverArticles(), this.repeateOrRender()]
    this.setState({
      user: (this.props.user),
      articles: []
    })
    // Promise.all(promises)
    this.getArticles()
  }

  getArticles = () => {
    const {
      sources
    } = this.props.user
    const newsURL = `https://newsapi.org/v2/top-headlines`
    fetch(`${newsURL}?pageSize=2&sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then(response => this.mapOverArticles(response))
    // .then(response => console.log(response))
  }

  mapOverArticles = (articles) => {
    const analyzedArticles = articles.articles.map((article) => {
      this.getSummary(article)
    })


  }

  getSummary = (article) => {
    const summaryURL = `http://api.meaningcloud.com/summarization-1.0?key=${apiConfig.meaningApi}&sentences=5&url=`
    fetch(`${summaryURL}${article.url}`, {
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
      .then(articleWithSummary => this.getSentiment(articleWithSummary))

  }

  getSentiment = (articleWithSummary) => {
    // const {articles} = this.state
    const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiConfig.meaningApi}&lang=en&url=`
    fetch(`${sentimentURL}${articleWithSummary.url}`, {
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
    .then(articleWithSentiment => this.setState({articles: [...this.state.articles, articleWithSentiment]}))
    .then((response) => this.repeateOrRender())

  }


  repeateOrRender = () => {
    const {articles} = this.state
    console.log(articles.length)
    if (articles.length < 10){
      setTimeout(this.getArticles(), 1000)
    } else {
      return
    }
  }


  //
  //   componentDidMount(){
  //     this.setState({
  //       user: (this.props.user)
  //     })
  //     const {sources} = this.props.user
  //     const newsURL = `https://newsapi.org/v2/top-headlines`
  //     const summaryURL = `http://api.meaningcloud.com/summarization-1.0?key=${apiConfig.meaningApi}&sentences=5&url=`
  //     const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiConfig.meaningApi}&lang=en&url=`
  //     const articlesList = []
  //
  //     fetch(`${newsURL}?pageSize=2&sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
  //       .then(response => response.json())
  //         .then(articles => {
  //            articles.articles.map(article => {fetch(`${summaryURL}${article.url}`, {
  //                   method: 'POST',
  //                   headers: {
  //                     'Content-Type': 'application/x-www-form-urlencoded'
  //                   },
  //                 })
  //             .then((response) => {return response.json()})
  //                 .then((response) => {
  //                   const articleWithSummary = Object.assign(article, response)
  //                     return articleWithSummary
  //                   })
  //                     .then(
  //                       fetch(`${sentimentURL}${article.url}`, {
  //                             method: 'POST',
  //                             headers: {
  //                               'Content-Type': 'application/x-www-form-urlencoded'
  //                             },
  //                           })
  //                       .then((response) => {return response.json()})
  //                           .then((response) => {
  //                             const articleWithSentiment = Object.assign(article, response)
  //                                 articlesList.push(articleWithSentiment)
  //                                 console.log(articlesList)
  //                                 return articlesList
  //                             })
  //                     ).then(this.setState({articles: articlesList}))
  //
  //             })
  //           })
  //
  //             .then(response => console.log(this.state))
  //   }
  //   // console.log(articlesList)
  //   // this.setState({ articles: [{...this.state.articles, articleWithSentiment }]})
  //
  //   // render(){
  //   //
  //   //
  //   //   return (
  //   //     "this.articlesList"
  //   //   )
  //   // }
  //
  //
  render() {
    if (this.state && this.state.users && this.state.articles && this.state.articles.length < 10) {
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



// <div className="cardsContainer">
//   {this.state.articles.map((article, i) => {
//       <div className='card' key={i}>
//           <h3>{article.articleWithSentiment.title}</h3>
//           <h4>By:{article.articleWithSentiment.author}</h4>
//           <p>{article.articleWithSentiment.description}</p>
//           <p>{article.articleWithSentiment.summary}</p>
//           <p>{article.articleWithSentiment.score_tag}</p>
//           <p>{article.articleWithSentiment.confidence}</p>
//           <p>{article.articleWithSentiment.irony}</p>
//           <p>{article.articleWithSentiment.subjectivity}</p>
//           <p>{article.articleWithSentiment.agreement}</p>
//           <a target= '_blank' rel="noopener noreferrer" href={article.articleWithSentiment.url}>
//           {article.articleWithSentiment.url}</a>
//     )
//   })}
// </div>
// }
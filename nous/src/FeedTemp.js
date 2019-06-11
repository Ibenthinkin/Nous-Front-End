import React, {Component} from 'react';
import apiConfig from './apiConfig'
import './App.css';

export default class Feed extends Component{


  componentDidMount(){
    this.setState({
      user: (this.props.user)
    })
    const {sources} = this.props.user
    const newsURL = `https://newsapi.org/v2/top-headlines`
    const summaryURL = `http://api.meaningcloud.com/summarization-1.0?key=${apiConfig.meaningApi}&sentences=5&url=`
    const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiConfig.meaningApi}&lang=en&url=`
    const articlesList = []

    fetch(`${newsURL}?pageSize=2&sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
        .then(articles => {
           articles.articles.map(article => {fetch(`${summaryURL}${article.url}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                })
            .then((response) => {return response.json()})
                .then((response) => {
                  const articleWithSummary = Object.assign(article, response)
                    return articleWithSummary
                  })
                    .then(
                      fetch(`${sentimentURL}${article.url}`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                            },
                          })
                      .then((response) => {return response.json()})
                          .then((response) => {
                            const articleWithSentiment = Object.assign(article, response)
                                articlesList.push(articleWithSentiment)
                                console.log(articlesList)
                                return articlesList
                            })
                    ).then(this.setState({articles: articlesList}))

            })
          })

            .then(response => console.log(this.state))
  }
  // console.log(articlesList)
  // this.setState({ articles: [{...this.state.articles, articleWithSentiment }]})

  // render(){
  //
  //
  //   return (
  //     "this.articlesList"
  //   )
  // }


  render(){
    return(
      <div>
        {this.state && this.state.user && this.state.articles && this.state.articles.length > 1 &&
          'somthien'
        }
      </div>
    )
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

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

  // mapOverArticles = (articles) => {
  //   articles.articles.forEach((article) => {
  //      {this.state.chainLinkComplete && this.getSummary(article)}
  //    })
  // }

  // mapOverArticles = (articles) => {
  //   articles.articles.forEach((article) => {
  //      if (this.state.chainLinkComplete === true){
  //         setTimeout(()=>this.getSummary(article), 1000)
  //      }
  //    })
  // }


  mapOverArticles = (articles) => {
   articles.articles.forEach((article) => {
     if(this.state.chainLinkComplete === true){
       // setTimeout(()=>this.getSummary(article), 500)
       // this.getSummary(article)
       // this.setState({chainLinkComplete: false})
       this.getSummary(article)
       //
       // this.flipState(article)
       // setTimeout(()=>this.flipState(article), 500)

     }

   })
 }

  // flipState = (article) =>{
  //   this.setState({chainLinkComplete: false})
  //   setTimeout(()=>this.getSummary(article), 500)
  // }



//  mapOverArticles = (articles) => {
//   articles.articles.forEach((article) => {
//     if(this.state.chainLinkComplete === true){
//       setTimeout(()=>this.getSummary(article), 500)
//       this.setState({chainLinkComplete: false})
//       this.getSummary(article)
//       setTimeout(() => (this.setState({chainLinkComplete: true})) , 1000)
//       this.getSummary(article)
//     }
//
//   })
// }




  //  mapOverArticles = (articles) => {
  //   articles.articles.forEach((article) => {
  //     if(this.state.chainLinkComplete === true){
  //       this.getSummary(article)
  //       this.setState({chainLinkComplete: false})
  //     } else if (this.state.chainLinkComplete === false ){
  //       setTimeout(() => (this.setState({chainLinkComplete: true})) , 3000)
  //       // this.getSummary(article)
  //     }
  //   })
  // }

  // async function mapOverArticles (articles) {
  //   const list = articles.articles.forEach(async(article) => {
  //    await this.getSummary(article)
  //  })
  //  await list
  // }

 //  mapOverArticles = async (articles) => {
 //   const list = articles.articles.forEach(async(article) => {
 //     await this.getSummary(article)
 //   })
 //   await list
 // }


  //  mapOverArticles = async (articles) => {
  //   const promises = articles.articles.forEach( async (article) => {
  //     const response =  await this.getSummary(article)
  //   })
  //   const results = await Promise.all(promises)
  //
  // }

  // mapOverArticles = (articles) => {
  //   const delay = t => new Promise(resolve => setTimeout(resolve, t));
  //   delay(5000).then(resolve => console.log(articles))
  // }
  // this.setState({chainLinkComplete:false})

  getSummary = (article) => {
    // setTimeout(() => this.setState({chainLinkComplete:false}), 3000)
    // setTimeout(() => console.log('athiing'), 3000)
    this.setState({chainLinkComplete: false}, this.fetchq )

  }

  fetchSummary = (article) => {
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
    const delay = t => new Promise(resolve => setTimeout(resolve, t));
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
    .then(articleWithSentiment => this.setState({
      articles: [...this.state.articles, articleWithSentiment],
      chainLinkComplete: true
    }))
    delay(500).then(() => console.log('Hello'));
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

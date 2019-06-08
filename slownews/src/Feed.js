import React, {Component} from 'react';
import apiConfig from './apiConfig'
import './App.css';
import Article from './Article'

export default class Feed extends Component{
  // constructor(){
  //   super()
  //   this.state = {
  //     user:{}
  //   }
  // }

  componentDidMount(){

    // console.log(sources.join(','))

    this.setState({
      user: (this.props.user)
    })
    const {sources} = this.props.user

    const url = 'https://newsapi.org/v2/top-headlines'

    fetch(`https://newsapi.org/v2/top-headlines?sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
        .then((articles) => {
          this.setState({
            articles: {articles}
          })
        })
  }

  // const lines = props.lines.map((line, i) => <Line {...line}
  //  key={line.id}
  //  delete={props.delete}
  //  update={props.update}/>)

  // getArticles = () => {
  //   const articlesList = this.state.articles.articles.articles.map((article, i) => <Article/> )
  //   return articlesList
  //
  // }



  render(){

    return(

      <div>
      <h2>{this.props.user.first}</h2>
        {this.state && this.state.user && this.state.articles &&
          <p>{this.state.articles.articles.articles}</p> &&
            <div>
              {this.state.articles.articles.articles.map((article, i) => {
                return(
                  <div key={i}>
                      <h3>{article.title}</h3>
                      <h4>By:{article.author}</h4>
                      <p>{article.content}</p>

                  </div>
                )
              } )}
            </div>




        }
      </div>
    )
  }

}

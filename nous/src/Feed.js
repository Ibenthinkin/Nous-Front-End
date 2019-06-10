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

    this.setState({
      user: (this.props.user)
    })
    const {sources} = this.props.user

    const url = 'https://newsapi.org/v2/top-headlines'

    fetch(`https://newsapi.org/v2/top-headlines?pageSize=5&sources=${sources.join(',')}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
        .then((articles) => {
          this.setState({
            articles: {articles}
          })
          console.log('totalState', this.state, 'just articles', this.state.articles.articles.articles)
        })
        .then(this.addDescription())
  }



  addDescription = () => {
    this.state.articles.articles.articles.map((article) =>{
      // fetch('http://api.meaningcloud.com/summarization-1.0?key=8dd6e2647a6a6e278562be67e12a1929&url=https://www.aljazeera.com/news/2019/06/qatari-foreign-minister-urges-de-escalation-iran-dispute-190609165320364.html&sentences=5', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      // }).then((response) => {return response.json()})
      // .then((response)=>{
      //   console.log(response)
      //   })
      //
    })  
  }



  //http://api.meaningcloud.com/summarization-1.0?key=8dd6e2647a6a6e278562be67e12a1929&url=https://www.aljazeera.com/news/2019/06/qatari-foreign-minister-urges-de-escalation-iran-dispute-190609165320364.html&sentences=5
  // var options = { method: 'POST',
  //   url: 'https://api.meaningcloud.com/summarization-1.0',
  //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //   form:
  //    { key: 'YOUR_KEY_VALUE',
  //      txt: 'YOUR_TXT_VALUE',
  //      url: 'YOUR_URL_VALUE',
  //      doc: 'YOUR_DOC_VALUE',
  //      sentences: 'YOUR_SENTENCES_VALUE' } };
  //
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //
  //   console.log(body);
  // });


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
                      <p>{article.description}</p>
                      <p>{article.content}</p>
                      <a target= '_blank' href={article.url} >{article.url}</a>
                  </div>
                )
              } )}
            </div>

        }
      </div>
    )
  }

}

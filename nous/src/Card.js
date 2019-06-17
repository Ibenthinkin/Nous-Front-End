import React, {Component} from 'react'
import apiConfig from './apiConfig'


export default class Card extends Component {
  constructor(){
    super()
    this.state = {
      clicked: false,
      gotSentiment: false
    }
  }

  componentDidMount = (props) =>{

    this.getSentiment()
  }




  handleClick = (event) => {
    this.setState({clicked: !this.state.clicked})
  }


  getSentiment = () => {
    // const delay = t => new Promise(resolve => setTimeout(resolve, t));
    const {url} = this.props.news
    const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiConfig.meaningApi}&lang=en&url=`
    fetch(`${sentimentURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this.setState({articleSentiment: response,
        gotSentiment: true
      })
    })
    // .then(response=>console.log(this.state.articleSentiment))

    // delay(3000).then(() => console.log(this.state.articleSentiment));
    // debugger
  }



  render(props){
    const news = this.props.news
    const i = this.props.i
      if (!this.state.gotSentiment){
        return null
      } else {

        return(
          <div className="card" key={i} onClick={this.handleClick}>
            <div className="content">
              <h3>
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  {news.title}
                </a>
              </h3>
              <p>{news.description}</p>
              <div className="author">
                <p>
                  By <i>{news.author ? news.author : this.props.source}</i>
                </p>
                <p>
                  Sentiment Scoire <i>{this.state.articleSentiment ? `sentiment score` : `NO sentiment score`}</i>
                </p>
              </div>
            </div>
          </div>
        )}

  }



}

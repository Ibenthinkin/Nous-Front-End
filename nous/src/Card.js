import React, {Component} from 'react'
import apiConfig from './apiConfig'


export default class Card extends Component {
  constructor(){
    super()
    this.state = {
      clicked: false
    }
  }

  componentDidMount = (props) => {

    setTimeout(()=>this.getSentiment(), (700*((this.props.i)+1)))
  }

  componentDidUpdate = (prevProps) =>{
    if (this.props.news.title !== prevProps.news.title) {
      this.setState({articleSentiment: null})
      setTimeout(()=>this.getSentiment(), (700*((this.props.i)+1)))
    }
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
      this.setState({articleSentiment: response})
    })
    .then(response=>console.log(this.state.articleSentiment))
  }

  colorizer = () => {

  }



  render(props){
    const news = this.props.news
    const i = this.props.i

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
                  <p> By{news.author ? news.author : this.props.source}</p>
                </p>
                <p>
                  Sentiment Score <p>{this.state.articleSentiment ? `${this.state.articleSentiment.score_tag} - ${this.state.articleSentiment.confidence}`: `NO sentiment score`}</p>
                </p>
              </div>
            </div>
          </div>
        )
  }


}
//
// const blue = rgba(8,	46,	126,	1)
// const yellow = rgba(247,	200,	40,	1)
// const red =  rgba(219,	29,	19,	1)

//
// Props
// i:
// 2
// news:
// {…}
// source:
// "wired"
// State
// articleSentiment:
// {…}
// agreement:
// "DISAGREEMENT"
// confidence:
// "76"
// irony:
// "IRONIC"
// model:
// "general_en"
// score_tag:
// "P"
// sentence_list:
// Array[224]
// sentimented_concept_list:
// Array[155]
// sentimented_entity_list:
// Array[52]
// status:
// {…}
// subjectivity:
// "SUBJECTIVE"
//
// clicked:
// false

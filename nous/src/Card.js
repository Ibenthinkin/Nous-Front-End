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

    // delay(1000).then(() => console.log('Hello'));
    // debugger
  }



  render(props){
    const news = this.props.news
    const i = this.props.i


        return(
          <div className="back" key={i} onClick={this.handleClick}>
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
                  Sentiment Score <i>{this.state.articleSentiment ? `sentiment score` : `NO sentiment score`}</i>
                </p>
              </div>
            </div>
          </div>
        )

  }


}



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

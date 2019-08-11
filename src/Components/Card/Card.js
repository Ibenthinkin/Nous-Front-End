import React, {Component} from 'react'
import apiConfig from '../apiConfig'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Card extends Component {
  constructor(){
    super()
    this.state = {
      clicked: false,
      hover: true
    }
  }

  componentDidMount = (props) => {
    setTimeout(() => this.getSentiment(), (700*((this.props.i)+1)) )
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.news.title !== prevProps.news.title) {
      this.setState({articleSentiment: null, color: null})
      setTimeout(()=>this.getSentiment(), (700*((this.props.i)+1)) )
    }
  }

  getSentiment = () => {
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
    .then(response=> this.setColor())

  }

  setColor = () => {
    const {articleSentiment} = this.state
    let colorValueNumber = articleSentiment.confidence
    if(articleSentiment.confidence > 86){colorValueNumber += 10} else {colorValueNumber -= 20}
    let colorValue = `.${colorValueNumber}`
    let tone = ``
      switch(articleSentiment.score_tag) {
        case "P":
          tone = `164,210,212`
          break;
        case "N":
        tone = `219,29,19`
          break;
        default:
          tone = `247,200,40`
      }
      const color = `rgba(${tone}, ${colorValue})`

      this.setState({color: color})
  }


  toggleHover = () => {
    this.setState({hover: !this.state.hover})
  }

  handleClick = (event) => {
    this.setState({clicked: !this.state.clicked})
  }

  lengthenScoreTag = () => {
    let {score_tag} = this.state.articleSentiment
    switch(score_tag){
      case "P":
        return `Positive`
      case "N":
        return `Negative`
      default:
          return `Neutral`
    }

  }


  render(props){
    const news = this.props.news
    const i = this.props.i

        return(
          <div className='card' key={i} onClick={this.handleClick}
            onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
              style={{backgroundColor: this.state.color ? this.state.color : 'rgba(130,127,123,.8)' }}
              >
            <div className="content">
              <h3>
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  {news.title}
                </a>
              </h3>
              <p>{news.description}</p>
                  <p> By {news.author ? news.author : this.props.source}</p>
                  <p>Sentiment Score: {this.state.articleSentiment ? ` ${this.lengthenScoreTag()} - ${this.state.articleSentiment.confidence}`: `NO sentiment score`}</p>
            </div>
          </div>
        )
  }


}

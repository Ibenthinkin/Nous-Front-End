import React, {Component} from 'react'

export default class Card extends Component {



  render(props){
      const news = this.props.news
      const i = this.props.i
    return(
      <div className="card" key={i}>
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
          </div>
        </div>
      </div>

    )
  }
}

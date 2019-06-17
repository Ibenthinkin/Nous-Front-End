import React, {Component} from 'react';
import './Feed.css';
import TitleCard from './TitleCard'
import Card from './Card'

export default class CardsContainer extends Component {



  render(){
    return(
      <div className="cardsContainer">
        <TitleCard articles={this.props.articles}
        changeSource={this.props.changeSource}
        user={this.props.user}
        source={this.props.source}/>

        {this.props.articles.map((news, i) => {
          return (
            <Card news={news} i={i} source={this.props.source}/>
          )
        })}
      </div>
    )
  }


}

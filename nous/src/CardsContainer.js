import React, {Component} from 'react';
import './App.css';
import Card from './Card'

export default class CardsContainer extends Component {



  render(){
    return(
      <div className="cardsContainer">

        {this.props.articles.map((news, i) => {
          return (
            <Card news={news} i={i} source={this.props.source}/>
          )
        })}
      </div>
    )
  }


}

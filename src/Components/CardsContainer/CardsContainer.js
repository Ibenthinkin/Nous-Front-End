import React from 'react';
import Card from '../Card/Card'

 const CardsContainer = (props) => {
  
    return (
      <div className="cardsContainer">
        {props.articles.map((news, i) => {
          return <Card news={news} index={i} source={props.source}/>
        }
        )}
      </div>
    )
  


}

export default CardsContainer
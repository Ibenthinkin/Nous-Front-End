import React, {Component} from 'react';
import apiConfig from '../apiConfig'
import NavBar from '../Navbar/Navbar'
import CardsContainer from '../CardsContainer/CardsContainer'


export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      articlesWithSentiment: [],
      sideMenuOpen: this.props.sideMenuOpen
    }
  }

  componentDidMount = () => {
    this.getArticles()
  }

  getArticles = () => {
    const source = this.props.source
    const newsURL = `https://newsapi.org/v2/everything?`
    fetch(`${newsURL}pageSize=10&sources=${source}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then((articles) => this.setState({articles:articles.articles}))
      .catch(error => {console.log(error)});
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props){
      this.getArticles()
    }
  }


  render(props) {

      return (
        <div className='feedbody' style={{marginLeft: this.props.sideMenuOpen ? 200 : 0 }}>
          <NavBar articles={this.props.articles}
          changeSource={this.props.changeSource}
          source={this.props.source}
          toggleMenu={this.props.toggleMenu}/>
          <CardsContainer source={this.props.source} changeSource={this.props.changeSource} articles={this.state.articles}/>
        </div>

        )
    }

}

import React, {Component} from 'react';
import apiConfig from '../apiConfig'
import NavBar from '../Navbar/Navbar'
import CardsContainer from '../CardsContainer/CardsContainer'


export default class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      sideMenuOpen: this.props.sideMenuOpen
    }
  }

  componentDidMount = () => {
    this.getArticles()
  }

  getArticles = () => {
    const {source} = this.props
    const newsURL = `https://newsapi.org/v2/everything?`
    fetch(`${newsURL}pageSize=10&sources=${source}&apiKey=${apiConfig.newsApi}`)
      .then(response => response.json())
      .then((response) => this.setState({articles: response.articles}))
      .catch(error => {console.log(error)});
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props){
      this.getArticles()
    }
  }


  render() {
    const {sideMenuOpen, changeSource, source, toggleMenu} = this.props
      return (
        <div className='feedbody' style={{marginLeft: sideMenuOpen ? 200 : 0 }}>
          <NavBar 
            changeSource={changeSource}
            source={source}
            toggleMenu={toggleMenu}
          />
          <CardsContainer 
            source={source} 
            changeSource={changeSource} 
            articles={this.state.articles}
          />
        </div>

        )
    }

}

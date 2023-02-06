import {Component} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import HomeHeader from '../HomeHeader'
import HeaderSmHome from '../HeaderSmHome'
import SliderItem from '../SliderItem'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    booksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      // console.log(data)
      const updatedData = data.books.map(eachItem => ({
        id: eachItem.id,
        coverPic: eachItem.cover_pic,
        title: eachItem.title,
        authorName: eachItem.author_name,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickFindBooksBtn = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  renderSmallBooksSlider = () => {
    const {booksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    }

    return (
      <Slider {...settings}>
        {booksList.map(eachItem => (
          <div className="slider-cont">
            <Link to={`/books/${eachItem.id}`} className="sm-slider-link">
              <img
                src={eachItem.coverPic}
                alt={eachItem.title}
                className="book-img"
              />
            </Link>
            <div className="slide-text-cont">
              <h1 className="home-title">{eachItem.title}</h1>
              <p className="home-author">{eachItem.authorName}</p>
            </div>
          </div>
        ))}
      </Slider>
    )
  }

  renderLargeBooksSlider = () => {
    const {booksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <ul className="lg-slider-books-cont ">
        <Slider {...settings}>
          {booksList.map(eachItem => (
            <SliderItem key={eachItem.id} booksDetails={eachItem} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderLargeLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSmallLoaderView = () => (
    <div className="sm-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSmallFailureView = () => (
    <div className="sm-home-failure-view-cont">
      <img
        src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674025464/Group_7522homefailure_pk6mju.png"
        className="sm-failure-image"
        alt="failure view"
      />
      <p className="sm-failure-para">Something went wrong, please try again.</p>
      <button type="button" className="sm-home-try-btn" onClick={this.getBooks}>
        Try Again
      </button>
    </div>
  )

  renderLargeFailureView = () => (
    <div className="home-failure-view-cont">
      <img
        src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674025464/Group_7522homefailure_pk6mju.png"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong, please try again.</p>
      <button type="button" className="home-try-btn" onClick={this.getBooks}>
        Try Again
      </button>
    </div>
  )

  renderLargeTopRatedBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderLargeBooksSlider()
      case 'LOADING':
        return this.renderLargeLoaderView()
      case 'FAILURE':
        return this.renderLargeFailureView()

      default:
        return null
    }
  }

  renderSmallTopRatedBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSmallBooksSlider()
      case 'LOADING':
        return this.renderSmallLoaderView()
      case 'FAILURE':
        return this.renderSmallFailureView()

      default:
        return null
    }
  }

  render() {
    const {booksList} = this.state
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      history.replace('/login')
    }
    console.log(booksList)
    return (
      <div className="home-bag-cont">
        <div className="lg-header-cont">
          <HomeHeader />
        </div>
        <div className="sm-header-home-cont">
          <HeaderSmHome />
        </div>
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-para">
          You are in the right place. Tell us what titles and genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <button
          type="button"
          className="sm-home-find-btn"
          onClick={this.onClickFindBooksBtn}
        >
          Find Books
        </button>
        <div className="top-rated-books-cont">
          <h1 className="top-books-heading">Top Rated Books</h1>
          <button
            type="button"
            className="home-find-btn"
            onClick={this.onClickFindBooksBtn}
          >
            Find Books
          </button>
        </div>
        <div className="lg-slider-books-cont">
          {this.renderLargeTopRatedBooks()}
        </div>
        <div className="sm-slider-books-cont">
          {this.renderSmallTopRatedBooks()}
        </div>
        <div className="home-social-cont">
          <Footer />
        </div>
      </div>
    )
  }
}
export default Home

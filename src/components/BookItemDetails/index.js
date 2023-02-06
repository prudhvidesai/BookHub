import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import HomeHeader from '../HomeHeader'
import HeaderSmBd from '../HeaderSmBd'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class BookItemDetails extends Component {
  state = {
    bookDetailsList: '',
    apiStatus: '',
  }

  componentDidMount = () => {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedBookDetails = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        bookDetailsList: updatedBookDetails,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookDetailsView = () => {
    const {bookDetailsList} = this.state
    const {
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
      aboutAuthor,
      aboutBook,
    } = bookDetailsList
    return (
      <>
        <div className="book-details-card">
          <div className="book-cover-data-cont">
            <img src={coverPic} className="cover-book-img" alt={title} />
            <div className="details-text-cont">
              <h1 className="details-title">{title}</h1>
              <p className="details-author">{authorName}</p>
              <p className="details-rating">
                Avg Rating: <BsFillStarFill className="star-img" /> {rating}
              </p>
              <p className="details-status">
                Status: <span className="read-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="ruler" />
          <h1 className="aa-heading">About Author</h1>
          <p className="aa-para">{aboutAuthor}</p>
          <h1 className="ab-heading">About Book</h1>
          <p className="ab-para">{aboutBook}</p>
          <div className="bd-social-cont">
            <Footer />
          </div>
        </div>
      </>
    )
  }

  renderSmBookDetailsView = () => {
    const {bookDetailsList} = this.state
    const {
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
      aboutAuthor,
      aboutBook,
    } = bookDetailsList

    return (
      <>
        <img src={coverPic} className="sm-cover-book-img" alt={title} />
        <p className="sm-details-title">{title}</p>
        <p className="sm-details-author">{authorName}</p>
        <p className="sm-details-rating">
          Avg Rating: <BsFillStarFill className="sm-star-img" /> {rating}
        </p>
        <p className="sm-details-stat">
          Status: <span className="sm-read-stat">{readStatus}</span>
        </p>
        <hr className="sm-ruler" />
        <h1 className="sm-aa-heading">About Author</h1>
        <p className="sm-aa-para">{aboutAuthor}</p>
        <h1 className="sm-ab-heading">About Book</h1>
        <p className="sm-ab-para">{aboutBook}</p>
        <div className="sm-social-cont">
          <Footer />
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="bd-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="bd-failure-view-cont">
      <img
        src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674025464/Group_7522homefailure_pk6mju.png"
        className="failure-img"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="home-try-btn"
        onClick={this.getBookDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderLgBookItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderBookDetailsView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderSmBookItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSmBookDetailsView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {bookDetailsList} = this.state
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      history.replace('/login')
    }
    console.log(bookDetailsList)
    return (
      <>
        <div className="book-item-details">
          <div className="lg-bi-header-cont">
            <HomeHeader />
          </div>
          <div className="sm-bi-header-cont">
            <HeaderSmBd />
          </div>
          <div className="lg-book-items-details-view-cont">
            {this.renderLgBookItemDetailsView()}
          </div>
          <div className="sm-book-items-details-view-cont">
            {this.renderSmBookItemDetailsView()}
          </div>
        </div>
      </>
    )
  }
}
export default BookItemDetails

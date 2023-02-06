import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import HomeHeader from '../HomeHeader'
import SidebarItems from '../SidebarItems'
import ButtonItems from '../ButtonItems'
import AllbookItems from '../AllbookItems'
import HeaderSmShelves from '../HeaderSmShelves'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Bookshelves extends Component {
  state = {
    booksListData: [],
    activeLabel: bookshelvesList[0].value,
    activeLabelId: bookshelvesList[0].id,
    searchValue: '',
    apiStatus: apiStatusConstants.initial,
    headingLabel: bookshelvesList[0].label,
  }

  componentDidMount = () => {
    this.getAllBooks()
  }

  getAllBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {activeLabel, searchValue} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeLabel}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.books.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        readStatus: eachItem.read_status,
        rating: eachItem.rating,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
      }))
      this.setState({
        booksListData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLabelBtn = btnId => {
    this.setState({activeLabelId: btnId})
    // console.log(btnId)
    const filteredList = bookshelvesList.filter(each => each.id === btnId)
    const updatedLabel = filteredList[0].value
    const hLabel = filteredList[0].label
    // console.log(booksListData)
    // console.log(filteredList)
    this.setState(
      {activeLabel: updatedLabel, headingLabel: hLabel},
      this.getAllBooks,
    )
  }

  onClickBookOptionsButton = btnId => {
    this.setState({activeLabelId: btnId})
    console.log(btnId)
    const filteredList = bookshelvesList.filter(each => each.id === btnId)
    const updatedLabel = filteredList[0].value
    // console.log(booksListData)
    // console.log(filteredList)
    this.setState({activeLabel: updatedLabel}, this.getAllBooks)
  }

  onChangeSearchText = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getAllBooks()
  }

  renderSearchFailureView = () => {
    const {searchValue} = this.state
    return (
      <div className="search-failure-cont">
        <img
          src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674193968/Asset_1_1searchnf_rfn1vp.png"
          className="failure-img"
          alt="no books"
        />
        <p className="failure-search-para">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderSmSearchFailureView = () => {
    const {searchValue} = this.state

    return (
      <div className="search-failure-cont">
        <img
          src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674193968/Asset_1_1searchnf_rfn1vp.png"
          className="failure-img"
          alt="no books"
        />
        <p className="failure-para">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksListData, searchValue, headingLabel} = this.state
    console.log(booksListData)
    return (
      <>
        <h1 className="all-heading">{headingLabel} Books</h1>
        <div className="search-cont">
          <input
            type="search"
            className="search-box"
            placeholder="Search"
            onChange={this.onChangeSearchText}
            value={searchValue}
          />
          <button
            type="button"
            className="search-btn"
            onClick={this.onClickSearchBtn}
            testid="searchButton"
          >
            <BsSearch />
          </button>
        </div>

        {booksListData.length === 0 ? (
          this.renderSearchFailureView()
        ) : (
          <>
            <ul className="all-books-cont">
              {booksListData.map(eachItem => (
                <AllbookItems key={eachItem.id} bookData={eachItem} />
              ))}
            </ul>
            <div className="shelves-social-cont">
              <Footer />
            </div>
          </>
        )}
      </>
    )
  }

  renderSmSuccessView = () => {
    const {booksListData, searchValue, activeLabelId} = this.state
    console.log(booksListData)
    return (
      <>
        <div className="sm-search-cont">
          <input
            type="search"
            className="search-box"
            placeholder="Search"
            onChange={this.onChangeSearchText}
            value={searchValue}
          />
          <button
            type="button"
            className="search-btn"
            onClick={this.onClickSearchBtn}
            testid="searchButton"
          >
            <BsSearch />
          </button>
        </div>
        <h1 className="shelves-sm-heading">Book Shelves</h1>
        <div className="sm-button-items-cont">
          {bookshelvesList.map(eachItem => (
            <ButtonItems
              key={eachItem.id}
              buttonDetails={eachItem}
              isActive={eachItem.id === activeLabelId}
              onClickBookOptionsButton={this.onClickBookOptionsButton}
            />
          ))}
        </div>

        {booksListData.length === 0 ? (
          this.renderSmSearchFailureView()
        ) : (
          <ul className="all-sm-books-cont">
            {booksListData.map(eachItem => (
              <AllbookItems key={eachItem.id} bookData={eachItem} />
            ))}
            <div className="shelves-social-cont">
              <Footer />
            </div>
          </ul>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-shelves-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSmLoadingView = () => (
    <div className="loader-shelves-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="shelves-failure-view-cont">
      <img
        src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674025464/Group_7522homefailure_pk6mju.png"
        className="failure-img"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong, please try again.</p>
      <button type="button" className="home-try-btn" onClick={this.getAllBooks}>
        Try Again
      </button>
    </div>
  )

  renderSmFailureView = () => (
    <div className="shelves-failure-view-cont">
      <img
        src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674025464/Group_7522homefailure_pk6mju.png"
        className="failure-img"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong, please try again.</p>
      <button type="button" className="home-try-btn" onClick={this.getAllBooks}>
        Try Again
      </button>
    </div>
  )

  renderLgBookshelves = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderSmBookshelves = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSmSuccessView()
      case 'LOADING':
        return this.renderSmLoadingView()
      case 'FAILURE':
        return this.renderSmFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLabelId} = this.state
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      history.replace('/login')
    }

    return (
      <div className="book-shelves-cont">
        <div className="shelf-header-sm-cont">
          <HeaderSmShelves />
        </div>
        <div className="shelf-header-lg-cont">
          <HomeHeader />
        </div>
        <ul className="side-bar-cont">
          <h1 className="side-bar-heading">Bookshelves</h1>
          {bookshelvesList.map(eachItem => (
            <SidebarItems
              key={eachItem.id}
              data={eachItem}
              onClickLabelBtn={this.onClickLabelBtn}
              isActive={eachItem.id === activeLabelId}
            />
          ))}
        </ul>
        <div className="view-lg-shelf-cont">{this.renderLgBookshelves()}</div>
        <div className="view-sm-shelf-cont">{this.renderSmBookshelves()}</div>
      </div>
    )
  }
}
export default Bookshelves

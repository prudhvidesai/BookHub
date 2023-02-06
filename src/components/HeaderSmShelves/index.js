import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'

class HeaderSmShelves extends Component {
  state = {
    isHomeHamBtnClicked: false,
  }

  onHomeHamBtnClicked = () => {
    this.setState(prevState => ({
      isHomeHamBtnClicked: !prevState.isHomeHamBtnClicked,
    }))
  }

  onClickHomeCloseBtn = () => {
    this.setState(prevState => ({
      isHomeHamBtnClicked: !prevState.isHomeHamBtnClicked,
    }))
  }

  onClickHomeLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isHomeHamBtnClicked} = this.state
    return (
      <>
        <div className="header-sm-shelves-cont">
          <div>
            <Link to="/" className="link-shelves-header">
              <img
                src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674648903/Group_7732smheadericon_wa9spv.png"
                className="logo-sm-shelves-img"
                alt="website logo"
              />
            </Link>
          </div>

          <button
            type="button"
            className="ham-shelves-btn"
            onClick={this.onHomeHamBtnClicked}
          >
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674649324/iconbar_oyv9yj.png"
              className="bars-shelves-img"
              alt="bars"
            />
          </button>
        </div>
        {isHomeHamBtnClicked ? (
          <div className="sm-shelves-menu-items ">
            <Link to="/" className="link-shelves-header">
              <p className="sm-shelves-home-para">Home</p>
            </Link>
            <Link to="/shelf" className="link-shelves-header">
              <p className="sm-shelves-shelves-para">Bookshelves</p>
            </Link>
            <button
              type="button"
              className="sm-shelves-logout-btn"
              onClick={this.onClickHomeLogoutBtn}
            >
              Logout
            </button>
            <button
              type="button"
              className="sm-shelves-close-btn"
              onClick={this.onClickHomeCloseBtn}
            >
              <IoMdCloseCircle className="sm-header-home-close-btn" />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(HeaderSmShelves)

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'

class HeaderSmHome extends Component {
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
        <div className="header-sm-home-cont">
          <div>
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674648903/Group_7732smheadericon_wa9spv.png"
              className="logo-sm-home-img"
              alt="website logo"
            />
          </div>

          <button
            type="button"
            className="ham-home-btn"
            onClick={this.onHomeHamBtnClicked}
          >
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674649324/iconbar_oyv9yj.png"
              className="bars-home-img"
              alt="bars"
            />
          </button>
        </div>
        {isHomeHamBtnClicked ? (
          <div className="home-sm-ham-items">
            <Link to="/" className="link-home-home-header">
              <p className="sm-home-para">Home</p>
            </Link>
            <Link to="/shelf" className="link-home-home-header">
              <p className="sm-shelves-para">Bookshelves</p>
            </Link>
            <button
              type="button"
              className="sm-home-logout-btn"
              onClick={this.onClickHomeLogoutBtn}
            >
              Logout
            </button>
            <button
              type="button"
              className="sm-home-close-btn"
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

export default withRouter(HeaderSmHome)

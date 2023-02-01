import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'

class HeaderSmBd extends Component {
  state = {
    isBdHamBtnClicked: false,
  }

  onBdHamBtnClicked = () => {
    this.setState(prevState => ({
      isBdHamBtnClicked: !prevState.isBdHamBtnClicked,
    }))
  }

  onClickBdCloseBtn = () => {
    this.setState(prevState => ({
      isBdHamBtnClicked: !prevState.isBdHamBtnClicked,
    }))
  }

  onClickBdLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isBdHamBtnClicked} = this.state
    return (
      <>
        <div className="header-sm-bd-cont">
          <Link to="/" className="link-bd-home-header">
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674648903/Group_7732smheadericon_wa9spv.png"
              className="logo-sm-bd-img"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="ham-home-btn"
            onClick={this.onBdHamBtnClicked}
          >
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674649324/iconbar_oyv9yj.png"
              className="bars-bd-img"
              alt="bars"
            />
          </button>
        </div>
        {isBdHamBtnClicked ? (
          <div className="bd-sm-ham-items">
            <Link to="/" className="link-bd-home-header">
              <p className="sm-bd-para">Home</p>
            </Link>
            <Link to="/shelf" className="link-bd-home-header">
              <p className="sm-bd-para">Bookshelves</p>
            </Link>
            <button
              type="button"
              className="sm-bd-logout-btn"
              onClick={this.onClickBdLogoutBtn}
            >
              Logout
            </button>
            <button
              type="button"
              className="sm-bd-close-btn"
              onClick={this.onClickBdCloseBtn}
            >
              <IoMdCloseCircle className="sm-header-bd-close-btn" />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(HeaderSmBd)

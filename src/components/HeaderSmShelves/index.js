import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoMdCloseCircle} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

class HeaderSmShelves extends Component {
  state = {
    isHamBtnClicked: false,
  }

  onClickHamBtn = () => {
    this.setState(prevState => ({
      isHamBtnClicked: !prevState.isHamBtnClicked,
    }))
  }

  onClickHamLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickCloseBtn = () => {
    this.setState(prevState => ({
      isHamBtnClicked: !prevState.isHamBtnClicked,
    }))
  }

  render() {
    const {isHamBtnClicked} = this.state

    return (
      <>
        <div className="header-sm-shelves-cont">
          <Link to="/" className="link-shelves-header">
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674648903/Group_7732smheadericon_wa9spv.png"
              className="logo-sm-shelves-img"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="ham-shelves-btn"
            onClick={this.onClickHamBtn}
          >
            <img
              src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674649324/iconbar_oyv9yj.png"
              className="bars-shelves-img"
              alt="bars"
            />
          </button>
        </div>
        {isHamBtnClicked ? (
          <div className="sm-ham-menu-items">
            <Link to="/" className="link-shelves-header">
              <p className="ham-home">Home</p>
            </Link>

            <p className="ham-bookshelves">Bookshelves</p>
            <button
              type="button"
              className="ham-logout-btn"
              onClick={this.onClickHamLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="ham-close-btn"
              onClick={this.onClickCloseBtn}
            >
              <IoMdCloseCircle className="ham-close-icon" />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(HeaderSmShelves)

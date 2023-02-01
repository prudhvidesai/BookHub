import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HomeHeader = props => {
  const onClickHeaderLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-cont">
      <div>
        <Link to="/" className="link-header">
          <img
            src="https://res.cloudinary.com/di7wgaobj/image/upload/v1673925931/Group_7731headerlogo_idrfpv.png"
            className="logo-img"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="nav-cont">
        <Link to="/" className="link-header">
          <li>
            <p className="header-active-home">Home</p>
          </li>
        </Link>
        <Link to="/shelf" className="link-header">
          <li>
            <p className="header-shelves">Bookshelves</p>
          </li>
        </Link>
        <li>
          <button
            type="button"
            className="home-logout-btn"
            onClick={onClickHeaderLogoutBtn}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(HomeHeader)

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const ShelvesHeader = props => {
  const {history} = props

  const onClickLogoutBtn = () => {
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
      <ul className="shelves-nav-cont">
        <Link to="/" className="link-header">
          <li>
            <p className="header-home">Home</p>
          </li>
        </Link>
        <Link to="/shelf" className="link-header">
          <li>
            <p className="header-active-shelves">Bookshelves</p>
          </li>
        </Link>
        <li>
          <button
            type="button"
            className="logout-shelves-header-btn"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(ShelvesHeader)

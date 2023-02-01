import {Link, withRouter} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="pnf-bg-cont">
    <img
      src="https://res.cloudinary.com/di7wgaobj/image/upload/v1674578629/Group_7484pnf_f1qvby.png"
      className="pnf-img"
      alt="not found"
    />
    <h1 className="pnf-heading">Page Not Found</h1>
    <p className="pnf-para">
      We are sorry, the page you requested could not be found, Please go back to
      home page.{' '}
    </p>
    <Link to="/" className="not-found-btn-link">
      <button type="button" className="pnf-btn">
        Go Back To Home
      </button>
    </Link>
  </div>
)

export default withRouter(PageNotFound)

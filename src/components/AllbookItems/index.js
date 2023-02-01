import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const AllbookItems = props => {
  const {bookData} = props
  const {id, title, rating, readStatus, coverPic, authorName} = bookData
  return (
    <Link to={`/books/${id}`} className="link-list">
      <li className="books-info-list-cont">
        <div>
          <img src={coverPic} className="cover-img" alt={title} />
        </div>
        <div className="book-details-cont">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <p className="book-rating">
            Avg Rating: <BsFillStarFill className="all-star-img" /> {rating}
          </p>
          <p className="book-status">
            status: <span className="span-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default AllbookItems

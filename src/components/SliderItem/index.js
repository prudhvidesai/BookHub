import {Link} from 'react-router-dom'
import './index.css'

const SliderItem = props => {
  const {booksDetails} = props
  const {coverPic, authorName, title, id} = booksDetails

  return (
    <Link to={`/books/${id}`} className="slider-link-item">
      <li className="lg-slider-cont">
        <img src={coverPic} alt={title} className="lg-book-img" />
        <h1 className="lg-home-title">{title}</h1>
        <p className="lg-home-author">{authorName}</p>
      </li>
    </Link>
  )
}
export default SliderItem

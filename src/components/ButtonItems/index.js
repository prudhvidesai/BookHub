import './index.css'

const ButtonItems = props => {
  const {buttonDetails, onClickBookOptionsButton, isActive} = props
  const {id, label} = buttonDetails
  const btnClss = isActive ? 'options-active-btn' : 'options-btn'

  const onClickBtn = () => {
    onClickBookOptionsButton(id)
  }

  return (
    <li>
      <button type="button" className={btnClss} onClick={onClickBtn}>
        {label}
      </button>
    </li>
  )
}
export default ButtonItems

import './index.css'

const SidebarItems = props => {
  const {data, isActive, onClickLabelBtn} = props
  const {id, label} = data

  const onLabelClick = () => {
    onClickLabelBtn(id)
  }

  const labelClass = isActive ? 'active-label-para' : 'label-para'

  return (
    <li>
      <button type="button" className={labelClass} onClick={onLabelClick}>
        {label}
      </button>
    </li>
  )
}
export default SidebarItems

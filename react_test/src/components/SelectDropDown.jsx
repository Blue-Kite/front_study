function SelectDropDown(props) {
    const ValueClick = () => {
        props.setCategoryIdentify(props.value)
        props.setIsOpen(!props.isOpen)
        props.setIdCategory(props.idTitleMap[props.value])
    }

    return(
        <li onClick={ValueClick} style={{ listStyleType: 'none'}}>{props.value}</li>
    );
}
export default SelectDropDown;


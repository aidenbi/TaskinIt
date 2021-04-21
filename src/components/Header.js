import PropTypes from 'prop-types'
import { IoLogOutOutline } from "react-icons/io5";



const Header = ({ title, onClick, auth }) => {

    return (
        <>
            <div>
                <header>
                    <h1>{title}</h1>
                </header>

            </div>
            {auth &&
                <div className="logoffButton">
                    <IoLogOutOutline />
                    <a onClick={onClick} >signout</a>
                </div>

            }
        </>
    )
}

Header.defaultProps = {
    title: 'TaskinIt',
}


Header.propTypes = {
    title: PropTypes.string.isRequired,
}


export default Header

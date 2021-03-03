import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({ title }) => {

    return (
        <div>
            <header className='header'>
                <h1>{title}</h1>
            </header>

        </div>
    )
}

Header.defaultProps = {
    title: 'TaskinIt',
}


Header.propTypes = {
    title: PropTypes.string.isRequired,
}


export default Header

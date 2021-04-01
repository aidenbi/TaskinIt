import PropTypes from 'prop-types'



const Header = ({ title, onClick, auth }) => {

    return (
        <>
            <div>
                <header>
                    <h1>{title}</h1>
                </header>

            </div>
            {auth && <button onClick={onClick} >signout</button>}
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

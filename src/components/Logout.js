import { useEffect } from 'react'

function Logout(props) {

    useEffect(() => {
        props.logout();
        props.history.push('/home') 
    })

    return(
        <div>
            Logging Out...
        </div>
    )
}

export default Logout;
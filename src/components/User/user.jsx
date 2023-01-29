import { useSelector } from "react-redux"
import { selectUserById } from "../../store/modules/user/selectors"

export const User = ({userId, className}) => {
    
    const userInfo = useSelector(state => selectUserById(state, userId))

    return (
        <div>
            <span>{userInfo.name}</span>
        </div>
    )
}
import {jwtDecode} from 'jwt-decode'

export const isJwtExpired = () => {
    const token = localStorage.getItem("token")

    let decodedToken = jwtDecode(token)

    let currentDate = new Date() 

    console.log("🚀 ~ isJwtExpired ~ decodedToken.exp * 1000 < currentDate.getTime():", decodedToken.exp * 1000 < currentDate.getTime())
    if(decodedToken.exp * 1000 < currentDate.getTime()) {
        return true
    } else {
        return false
    }
}
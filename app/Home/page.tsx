import { logout } from "../Auth/actions";
export default function Home() {
    return(
        <h1 onClick={logout} >Home</h1>
    )
}
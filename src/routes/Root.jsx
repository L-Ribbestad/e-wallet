import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux"
import { getUsername } from "../features/cards/cardSlice";

const Root = () => {
    let dispatch = useDispatch();
    dispatch(getUsername());
    return(
        <div>
            <Outlet />
        </div>
    )
}

export default Root;
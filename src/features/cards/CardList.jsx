import { useSelector, useDispatch } from "react-redux";
import { CardFeat } from "./CardFeat";
import { Link } from "react-router-dom";
import { removeCard } from "./cardSlice";

export const CardList = () => {
    const cards = useSelector((state) => state.cards.cardsArr);
    const dispatch = useDispatch();

    return(
        <div>
            {cards.length < 4 ? 
            <Link to="/newcard">
                <button className="create-button">Skapa Kort</button>
            </Link> : null}
            {
                cards.map((card, i) => (
                    <div key={i}>
                        <CardFeat {...card} />
                        <button className="delete-button" onClick={() => dispatch(removeCard(i))}>Ta bort</button>
                    </div>
                ))
            }
        </div>
    )
}
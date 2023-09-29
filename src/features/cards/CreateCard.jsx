import { useNavigate } from "react-router-dom";
import { addCard } from "./cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { CardFeat } from "./CardFeat";
import { useState, useEffect } from "react";
import cardFormCSS from "./CreateCard.module.css"

export const CreateCard = () => {
    const dispatch = useDispatch();
    const cardHolder = useSelector((state) => state.cards.cardsArr[0].cardHolder);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const date = new Date();
    let currentYear = date.getFullYear() % 100;

    const [data, setData] = useState({ 
        vendor: "Visa",
        vendorLogo:"https://i.ibb.co/WHZ3nRJ/visa.png",
        cardNumber: "xxxxxxxxxxxxxxxx",
        cardHolder,
        expireMonth: "",
        expireYear: "",
        ccv: "",
        active: false

    });

    useEffect(() => {
        setData((prevData) => ({ ...prevData, cardHolder }));
    }, [cardHolder]);

    const handlePreview = (e) => {
        const {name, value} = e.target;
        setData({ ...data, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if(data.expireMonth.length !== 2 ) {
            validationErrors.expireMonth = 'ange rätt fomat "MM"'
        }
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            let dataToDispatch = {...data, active: false};
            dispatch(addCard(dataToDispatch));
            navigate("/")
        }
    }

    return(
        <div className={cardFormCSS.cardForm}>
            <div className={cardFormCSS.preview}>
                <CardFeat {...data} />
            </div>
            <form className={cardFormCSS.addForm} onSubmit={handleSubmit}>
                <label htmlFor="cardnumber-input">CARD NUMBER</label>
                <input type="text" id="cardnumber-input" placeholder="xxxx xxxx xxxx xxxx" name="cardNumber" minLength={"16"} maxLength={"16"} required onChange={handlePreview} />
                <label htmlFor="cardholder-input">CARD HOLDER NAME</label>
                <input type="text" id="cardholder-input" value={cardHolder} name="cardHolder" disabled />
                <p>VALID THRU</p>
                <div className="upper-div">
                    {errors.expireMonth && <span>{errors.expireMonth}</span>}
                    <input type="number" id="month-input" placeholder="MM" name="expireMonth" max={12} min={0} required onChange={handlePreview} />
                    <span>/</span>
                    <input type="number" id="year-input" placeholder="YY" name="expireYear" min={currentYear} max={99} required onChange={handlePreview} />
                </div>
                <div className="bottom-div">
                <label htmlFor="cardholder-input">CCV</label>
                <input type="number" id="ccv-input" placeholder="***" name="ccv" min={100} max={999} required onChange={handlePreview} />
                <select name="vendor" id="vendor-select" onChange={handlePreview}>
                    <option>Visa</option>
                    <option>Amex</option>
                    <option>Mastercard</option>
                </select>
                </div>
                <button className="form-button">Lägg till</button>
            </form>
        </div>

    )
}
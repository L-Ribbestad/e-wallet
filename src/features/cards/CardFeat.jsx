import cardCSS from "./CardFeat.module.css"

export const CardFeat = ({vendor, cardNumber , cardHolder, expireMonth, expireYear, ccv}) => {
    let cardColor;
    if(vendor === "Visa"){
        cardColor = cardCSS.blue
    }
    else if(vendor === "Amex"){
        cardColor = cardCSS.grey
    }
    else if(vendor === "Mastercard"){
        cardColor = cardCSS.orange
    }
    return (
        <div className={`${cardCSS.card} ${cardColor}`}>
            <div className={cardCSS.row}>
                <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="40px"/>
                {vendor === "Visa" ? <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="40px"/> 
                : vendor === "Amex" ? <img src="../../../images/amex.png"  width="40px"/> :
                <img src="../../../images/mastercard.png"  width="40px"/>}
            </div>
            <div className={`${cardCSS.cardNumb}`}>
                <p>{cardNumber.replace(/.{4}/g, '$& ')}</p>
            </div>
            <div className={`${cardCSS.row} ${cardCSS.labels}`}>
                <label htmlFor="cardHolder">CARDHOLDER</label>
                <label htmlFor="date">VALID THRU</label>
            </div>
            <div className={`${cardCSS.row} ${cardCSS.holderDate}`}>
                <p id="cardHolder">{cardHolder}</p>
                <p id="date">{expireMonth}/{expireYear}</p>
            </div>
                {/* {ccv} */}
        </div>
    )
}
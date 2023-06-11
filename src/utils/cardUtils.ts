export const AcceptedPayments = {
  RUPAY: "rupay",
  VISA: "visa",
  MASTER_CARD: "master_card",
  AMEX: "american_express",
};

export const getIssuerNameFromCardNumber = (cardNumber: string) => {
  if(cardNumber){
    if (cardNumber.startsWith("4")) {
      return AcceptedPayments.VISA;
    } else if (cardNumber.startsWith("5")) {
      return AcceptedPayments.MASTER_CARD;
    } else if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
      return AcceptedPayments.AMEX;
    } else if (cardNumber.startsWith("6")) {
      return AcceptedPayments.RUPAY;
    }
  }

  return "";
};

export const getIssuerImage = (issuerName: string) => {
  if(issuerName){
    if(issuerName === AcceptedPayments.AMEX){
      return 'https://w7.pngwing.com/pngs/58/14/png-transparent-amex-card-credit-logo-logos-logos-and-brands-icon.png';
    }
    else if(issuerName === AcceptedPayments.MASTER_CARD){
      return 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg';
    }
    else if(issuerName === AcceptedPayments.RUPAY){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png';
    }
    else if(issuerName === AcceptedPayments.VISA){
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png";
    }
  }
};

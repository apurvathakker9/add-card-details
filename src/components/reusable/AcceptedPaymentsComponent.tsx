import { h, Fragment } from "preact";
import mastercard from '../../assets/images/mastercard.svg';
import visa from '../../assets/images/visa.webp';
import rupay from '../../assets/images/rupay.png';
import amex from '../../assets/images/amex.png';

const AcceptedPaymentComponent = ()=> {
  return (
    <>
      <div class="row align-items-center">
        <div class="col-md-2 col-3">
          <img class="w-100" src={rupay} />
        </div>
        <div class="col-md-2 col-3">
          <img class="w-100" src={visa} />
        </div>
        <div class="col-md-2 col-3">
          <img class="w-100" src={mastercard} />
        </div>
        <div class="col-md-2 col-3">
          <img class="w-100" src={amex} />
        </div>
      </div>
    </>
  );
}

export default AcceptedPaymentComponent;

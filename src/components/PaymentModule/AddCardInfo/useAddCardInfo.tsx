import { z } from "zod";
import { SubmitHandler,FormError, useForm, zodForm, reset } from "@modular-forms/preact";
import axios from "axios";
import { StateUpdater } from "preact/hooks";

const SERVER_URL = 'https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9';

interface userAddCardInfoProps{
  setLoading: StateUpdater<boolean>;
  addCardCallback: (res)=>void
  setIssuerImage: StateUpdater<string>
}

const useAddCardInfo = (props: userAddCardInfoProps) => {

  const { setLoading, addCardCallback, setIssuerImage } = props;

  const formSchema = z.object({
    cardHolderName: z.string().min(1, "Please enter Card Holder Name"),
    cardNumber: z
      .string()
      .min(1, "Please enter the Card Number"),
    expiryMonth: z.number({
      invalid_type_error: 'Month Should be a number between 1-12'
    }).min(1).max(12),
    expiryYear: z
      .number({
        invalid_type_error: 'Year should be a number.'
      })
      .min(new Date().getFullYear(), "Please check the date again."),
    cvv: z.string().min(3,'CVV must be alteast 3 chracters').max(4,'CVV cannot be more than 4 characters'),
  });

  const [addCardForm, { Form, Field }] = useForm<z.infer<typeof formSchema>>({
    initialValues:{
      cardHolderName: '',
      cvv: '',
      expiryMonth: undefined,
      expiryYear: undefined,
      cardNumber:''
    },
    validate: zodForm(formSchema),
  });

  const handleFormSubmit: SubmitHandler<z.infer<typeof formSchema>> = (value, event) => {
    // Modify the card Number by removing the spaces and check against the regEx to see if the format is correct
    const newCardNumber = value.cardNumber.replace(/\s/g,"");
    const regEx = /^\d{13}$|^\d{15}$|^\d{16}$|^\d{19}$/;
    if(!regEx.test(newCardNumber)){
      throw new FormError<z.infer<typeof formSchema>>('',{
        cardNumber: 'The card number is not correct'
      })
    }

    // Validate the Year and the Month for the current year
    const currentMonth = (new Date().getMonth() + 1);    
    const currentYear = new Date().getFullYear();
    if(value.expiryMonth < currentMonth && value.expiryYear === currentYear){
      throw new FormError<z.infer<typeof formSchema>>("", {
        expiryMonth: "Month has to be more than equal to current month if year is current",
      });
    }

    // Create the new object to be sent to the Server
    const addCardObj = {
      cardNo: newCardNumber,
      cvv: value.cvv,
      expiryMonth:value.expiryMonth,
      expiryYear: value.expiryYear,
      name: value.cardHolderName
    }

    // Send the Request
    setLoading(true);
    axios
      .post(SERVER_URL, addCardObj, {
        headers: {
          "Content-Type": "application/json",
          Origin: "https://instacred.me", // This is automatically setup by the browser
        },
      })
      .then((res) => {
        reset(addCardForm);
        setIssuerImage(null);
        addCardCallback(res.data);
      })
      .catch((err) => {
        console.log(err);
        addCardCallback({
          success: false,
          data: err
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleFormSubmit,
    Form,
    Field,
    addCardForm,
  };
};

export default useAddCardInfo;

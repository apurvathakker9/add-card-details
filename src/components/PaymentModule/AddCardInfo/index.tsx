import { Fragment, h } from "preact";
import AcceptedPaymentComponent from "../../reusable/AcceptedPaymentsComponent";
import useAddCardInfo from "./useAddCardInfo";
import { useForm, zodForm, toCustom, setValue } from "@modular-forms/preact";
import { z } from "zod";
import TextField from "../../reusable/form-elements/TextField";
import { useState } from "preact/hooks";
import {
  getIssuerImage,
  getIssuerNameFromCardNumber,
} from "../../../utils/cardUtils";
import { debounce } from "../../../utils/globalUtils";

interface AddCardInfoProps {
  addCardCallback: (res) => void;
}

const cardNumberTextBoxStyle = {
  paddingRight: "calc(1.5em + 0.75rem)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right calc(0.375em + 0.1875rem) center",
  backgroundSize: "calc(1.75em + 0.375rem) calc(0.75em + 0.375rem)",
};

const AddCardInfo = (props: AddCardInfoProps) => {
  const { addCardCallback } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [issuerImage, setIssuerImage] = useState<string | null>(null);
  const { formSchema, handleFormSubmit } = useAddCardInfo({
    setLoading: setLoading,
    addCardCallback: addCardCallback,
  });

  const debouncedFunc = debounce(function (field: string) {
    if (field.length > 3) {
      setIssuerImage(getIssuerImage(getIssuerNameFromCardNumber(field)));
    }
  }, 200);

  const [addCardForm, { Form, Field }] = useForm<z.infer<typeof formSchema>>({
    validate: zodForm(formSchema),
  });

  return (
    <>
      <div class="border rounded p-md-5 p-4 bg-white w-100">
        <Form onSubmit={handleFormSubmit}>
          <h4>Add a new card</h4>
          <hr />
          <div class="my-3">
            <div class="row">
              <div class="col">
                <span class="text-muted" style={{ fontSize: "15px" }}>
                  We Accept
                </span>
              </div>
            </div>
            <AcceptedPaymentComponent />
          </div>
          <div class="mb-4"></div>
          <div class="mb-4">
            <Field name="cardHolderName">
              {(field, props) => (
                <TextField
                  {...props}
                  value={field.value}
                  error={field.error}
                  label="Card Holder Name"
                  placeholder="John Smith"
                  required
                />
              )}
            </Field>
          </div>
          <div class="mb-4">
            <Field
              name="cardNumber"
              transform={toCustom(
                (value: string, event) => {
                  const newStr = value
                    .replace(/\s/g, "")
                    .replace(/(.{4})/g, "$1 ")
                    .trim();
                  return newStr;
                },
                { on: "input" }
              )}
            >
              {(field, props) => (
                <TextField
                  {...props}
                  value={field.value}
                  error={field.error}
                  label="Card Number"
                  type="tel"
                  style={{
                    ...cardNumberTextBoxStyle,
                    backgroundImage: `url(${issuerImage})`,
                  }}
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                  onChange={(e) => {
                    debouncedFunc(e.currentTarget.value);
                  }}
                />
              )}
            </Field>
          </div>
          <div class="row">
            <div class="mb-4 col-md-6">
              <div class="row">
                <div class="col-6">
                  <Field name="expiryMonth" type="number">
                    {(field, props) => (
                      <TextField
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Month"
                        placeholder="MM"
                        onInput={(e) => {
                          setValue(
                            addCardForm,
                            "expiryMonth",
                            Number(e.currentTarget.value.replace(/\s/g, ""))
                          );
                        }}
                        required
                      />
                    )}
                  </Field>
                </div>
                <div class="col-6">
                  <Field name="expiryYear" type="number">
                    {(field, props) => (
                      <TextField
                        {...props}
                        value={field.value}
                        error={field.error}
                        label="Year"
                        placeholder="YYYY"
                        required
                        onInput={(e) => {
                          setValue(
                            addCardForm,
                            "expiryYear",
                            Number(e.currentTarget.value.replace(/\s/g, ""))
                          );
                        }}
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <div class="col-md-5 offset-md-1 col-12 mb-4">
              <Field name="cvv">
                {(field, props) => (
                  <TextField
                    {...props}
                    value={field.value}
                    error={field.error}
                    label="CVV"
                    type="password"
                    placeholder="123"
                    required
                  />
                )}
              </Field>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-lg mt-3 w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Loading...</span>
              </>
            ) : (
              "Add Card"
            )}
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddCardInfo;

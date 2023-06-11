import { h, Fragment, JSX, Ref } from "preact";
import {
  ReadonlySignal,
  useSignal,
  useSignalEffect,
} from "@preact/signals";
import { forwardRef } from "preact/compat";

type TextFieldProps = {
  type?: "text" | "email" | "tel" | "password" | "url" | "number" | "date";
  name: string;
  value: ReadonlySignal<string | number | undefined>;
  ref: Ref<HTMLInputElement>;
  onInput: JSX.GenericEventHandler<HTMLInputElement>;
  onChange: JSX.GenericEventHandler<HTMLInputElement>;
  onBlur: JSX.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: ReadonlySignal<string>;
  style?: string | h.JSX.CSSProperties
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, value, error, ...props }, ref) => {
    const { name, required,placeholder, type, style } = props;

    const input = useSignal<string | number | undefined>(undefined);
    useSignalEffect(() => {
      if (!Number.isNaN(value.value)) {
        input.value = value.value === undefined ? "" : value.value;
      }
    });

    return (
      <>
        {label && (
          <label for={name} class="form-label">
            {label} {required ? <span class="text-danger">*</span> : null}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          id={name}
          type={type ? type : "text"}
          value={input}
          placeholder={placeholder}
          class={`form-control form-control-lg ${
            error.value ? "is-invalid" : ""
          }`}
          required
          style={style}
        />
        {error.value && <div class="invalid-feedback">{error}</div>}
      </>
    );
  }
);

export default TextField;

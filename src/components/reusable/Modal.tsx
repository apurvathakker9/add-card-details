import { Fragment, FunctionComponent, h } from "preact";

interface ModalStripProps {
  modalType: "info" | "danger" | "success" | null,
  message: string | null
}

const ModalStrip: FunctionComponent<ModalStripProps> = (props) => {

  const {modalType, message} = props;

  return (
    <Fragment>
      <div
        class="position-fixed top-0"
        style={{
          width: "100vw",
        }}
      >
        <div
          class={
            !modalType
              ? "alert text-center fade hide"
              : "alert text-center fade show alert-" + modalType
          }
          role="alert"
        >
          {message}
        </div>
      </div>
    </Fragment>
  );
};

export default ModalStrip;

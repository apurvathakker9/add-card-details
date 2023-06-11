import { Fragment, h } from "preact";
import AddCardInfo from "../../components/PaymentModule/AddCardInfo";
import { ModalTypeValues } from "src/types/modalTypes";

interface HomePageProps {
  path: string;
  openModalStrip: (
    modalType: ModalTypeValues,
    message: string,
    time: number
  ) => void;
}

const Home = (props: HomePageProps) => {
  const { openModalStrip } = props;

  const addCardCallback = (res) => {
    if (res.success) {
      openModalStrip("success", "Card Successfully Added", 5000);
    } else {
      openModalStrip("danger", "Error in submitting card details", 5000);
    }
  };

  return (
    <Fragment>
      <div class="container payment-container" style={{ marginTop: "6rem" }}>
        <div class="d-flex align-items-center h-100">
          <AddCardInfo addCardCallback={addCardCallback} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

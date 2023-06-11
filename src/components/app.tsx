import { h, Fragment } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import ModalStrip from './reusable/Modal';
import useModalStrip from '..//hooks/useModalStrip';

const App = () => {

  const { openModalStrip, message, modalType } = useModalStrip();
  return (
    <>
      <ModalStrip message={message} modalType={modalType} />
      <Router>
        <Home path="/" openModalStrip={openModalStrip} />
      </Router>
    </>
  );};

export default App;

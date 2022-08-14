// Import dependencies
import React from 'react';
import 'regenerator-runtime/runtime';

// Import styles and components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Import functions
import { login, logout, initContract } from './assets/js/near/utils';


function App() {

  // `nearInitPromise` gets called on page load
  window.nearInitPromise = initContract()
    .then(flow)
    .catch(console.error)

  // Splitting logged-in and logged-out flows
  function flow() {
    console.log('Near Promise initiated...');
    if (window.walletConnection.isSignedIn()) {
      signedInFlow()
    } else {
      signedOutFlow()
    }
  }

  // Display the signed-out-flow container
  function signedOutFlow() {
    document.querySelector('.login-container').style.display = 'block';
  }

  // Displaying the signed-in-flow container
  async function signedInFlow() {
    document.querySelector('.logout-container').style.display = 'block';
    document.getElementById('account-id').innerText = window.accountId;
    console.log(window.walletConnection);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Salad.Finance</h1>
          <div className="logout-container">
            <p>Wallet: <span id="account-id"></span></p>
            <Button className="btn-primary btn" size="md" onClick={logout}>Logout</Button>
          </div>
          <div className="login-container">
            <p>In order to interact with Near, please login.</p>
            <Button className="btn-primary btn" size="md" onClick={login}>Login</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

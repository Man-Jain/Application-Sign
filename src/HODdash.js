import React from "react";
import { Collapse,Container,Row, FormInput, Button,Col, Card,CardHeader,CardTitle,CardBody,FormTextarea,FormSelect,Badge } from "shards-react";
import {config} from './utils.js'

console.log(config.mnemonic,"config");

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const algosdk = require('algosdk');

var recoveredAccount = algosdk.mnemonicToSecretKey(config.mnemonic);

let algodclient = new algosdk.Algod(config.token, config.server, config.port);
const kmdclient = new algosdk.Kmd(config.token2, config.serverkmd, config.port2);

export default class HODdash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestArtifact: 'Application 1',
      new : Math.random(),
    };
  }
  getNewArtifact(hash){
    const latestArtifact = this.state.latestArtifact;
    const latestArtifactNew = hash;
    console.log('Changes  new artifact ');
    console.log(hash);
    this.setState({latestArtifact:latestArtifactNew, new:Math.random()});
  }

  render(){
    return(
      <div>
        <Container className="main-container">
        <Row>
        <Col sm="12" md="12">
        <CreatedArtifacts key={this.state.new} latestOne={this.state.latestArtifact} ></CreatedArtifacts>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

class NewArtifact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reciever: '',
      coordinates: '',
      name: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.addArtifact = this.addArtifact.bind(this);
  }

  addArtifact(){
    console.log('Clicking');
    (async() => {
    //Get the relevant params from the algod
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    //create a transaction
    //note that the closeRemainderTo parameter is commented out
    //This parameter will clear the remaining funds in an account and
    //send to the specified account if main transaction commits
    console.log(recoveredAccount.addr);
    let txn = {
        "from": recoveredAccount.addr,
        "to": this.state.reciever,
        "fee": 0,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(this.state),
        //"closeRemainderTo": "IDUTJEUIEVSMXTU4LGTJWZ2UE2E6TIODUKU6UW3FU3UKIQQ77RLUBBBFLA"
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //submit the transaction
    let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
    console.log(tx);
    this.props.newartifact(tx);
    console.log("Transaction : " + tx.txId);

})().catch(e => {
    console.log(e,"e");
});
  }

  handleInput(event) {
    const target = event.target;
    if (target.name == "reciever"){
      this.setState(Object.assign({}, this.state, {reciever: target.value}));
    }
    else if (target.name == "coordinates") {
      this.setState(Object.assign({}, this.state, {coordinates: target.value}));
    }
    else {
      this.setState(Object.assign({}, this.state, {name: target.value}));
    }
  }
  
  render(){
    return(
      <div>
      <h3>Enter New Application</h3><hr/> <br />
      <Card>
      <CardHeader>Enter The Details Of Application</CardHeader>
      <CardBody>
        <CardTitle>Subject</CardTitle>
        <FormInput name="reciever" placeholder="Subject" value={this.state.reciever} onChange={this.handleInput} />
        <br />
        <CardTitle>Application Details</CardTitle>
        <FormTextarea placeholder="Enter Application Details"/>
 
        <br />
        
        <CardTitle>Application From:</CardTitle>
        <FormInput name="name" placeholder="Application From" value={this.state.name} onChange={this.handleInput}/>
        <br />
        <CardTitle>Application To:</CardTitle>
        <FormSelect>
      <option value="first">HOD</option>
      <option value="second">Teacher Guardian</option>
      <option value="third"> Parents</option>
        
      </FormSelect>
        <br /> <br /> 
        <Button onClick={this.addArtifact}></Button>
      </CardBody>
      
    </Card>
   </div>
    );
  }
}


class CreatedArtifacts extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, 'num':2, history: [] };
    var tx = this.props.latestOne;
    console.log('Tx is');
    console.log(tx);
    const history = this.state.history;
    console.log('History Before Adding');
    console.log(history);
    if(tx){
      history.push(tx);
    }
    console.log('New History');
    console.log(history);
    var newState = Object.assign({}, this.state , {history: history});
    this.state = newState;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render(){
    const listItems = this.state.history.map((item) =>
      <li key={item.txId} className="list-items-artifacts">
      <br/ >
      <Card>
      <CardHeader>Latest Application Id:-{item.txId} </CardHeader>
      <CardBody>
        <p>Application Name :- </p>
        <p>Current status</p>
       
        <Button onClick={this.toggle}>See The Status</Button>
        <Button>Approve</Button>
        <Collapse open={this.state.collapse}>
          
        <br/ >
        <span>
       <Badge theme="success">Parents</Badge>
       <Badge theme="danger">Teacher Guardian</Badge>
      <Badge theme="danger">HOD</Badge>
 
            </span>
         
        </Collapse>
      </CardBody>
    </Card>
      </li>
    )
    return(
      // Previously created application
        <div>
        <h3>Previously Created Application</h3><hr/> <br />
        {listItems}
      </div>
    );
  }
}

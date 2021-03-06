// Imports -----------------------------
import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { Container, Row, Col, FormInput, Button ,Card,CardHeader,CardTitle,CardBody,CardFooter, } from "shards-react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import './index.css';
import NavExample from './Navbar';
import CreateApplication from './studentdash';
import TrackArtifact from './TrackArtifact';
import HODdash from './HODdash';
import parentsdash from './parentsdash';
import TGDash from './TGDash';
import App from './App.js'

import {config} from './utils.js'

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const algosdk = require('algosdk');

var recoveredAccount = algosdk.mnemonicToSecretKey(config.mnemonic);

let algodclient = new algosdk.Algod(config.token, config.server, config.port);
const kmdclient = new algosdk.Kmd(config.token2, config.serverkmd, config.port2);
// -------------------------------------

class Main extends React.Component {

  checkWallet(){
    myCache.get( "user", function( err, value ){
      if( !err ){
        if(value == undefined){
          (async () => {
            const a = await kmdclient.listWallets();
            console.log(a);
            //let walletid = (await kmdclient.createWallet("MyTeasdfsnfsnfzxczxansdfalsfhlstWallet", "testpassword")).wallet.id;
            //console.log("Created wallet.", walletid);

      //let wallethandle = (await kmdclient.initWalletHandle(walletid, "testpassword")).wallet_handle_token;
      //console.log("Got wallet handle.", wallethandle);

      //let address = (await kmdclient.generateKey(wallethandle)).address;
      //console.log("Created new account.", address);
      })().catch(e => {
        console.log('Error');
          console.log(e);
      });
        }else{
          console.log( value );
        }
      }
    });
  }

  render(){
    this.checkWallet();
    return(
      <div>
      <NavExample />
      <HashRouter>
      <Route exact path="/" component={TrackArtifact}/>
        <Route path="/student-dash" component={CreateApplication}/>
        <Route path="/block" component={App}/>
        <Route path="/tg-dash" component={TGDash}/>
        <Route path="/hod-dash" component={HODdash}/>
        <Route path="/parents-dash" component={parentsdash}/>
      </HashRouter>
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

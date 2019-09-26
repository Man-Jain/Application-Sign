import React from "react";

import {
  Row,
  Col,
  Container,
  Button,
  FormInput,
  Collapse,
  Card,
  CardFooter,
  CardBody,
  CardTitle,
  CardHeader
} from 'shards-react';

export default class TrackArtifact extends React.Component {
  render() {
    return (
      <div>
        <Container className="main-container">
        <Row>
        <Col sm="12" md="12">
        <NewTrack></NewTrack>
        </Col>
        <Col sm="12" md="12">
        <hr/ ><br />
        <TrackHistory></TrackHistory>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

class NewTrack extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render(){
    return(
          <div>
          <h3>Enter The Item Hash You Want To Track :- </h3>
          <Row>
          <Col sm="11" md="11">
          <FormInput placeholder="Item Hash" />
          </Col>
          <Col sm="1" md="1">
          <Button onClick={this.toggle}>Track</Button>
          </Col>
          </Row>
          <Collapse open={this.state.collapse}>
            <div className="p-3 mt-3 border rounded">
              <h5>😍 Now you see me!</h5>
              <span>
                In sagittis nibh non arcu viverra, nec imperdiet quam suscipit.
                Sed porta eleifend scelerisque. Vestibulum dapibus quis arcu a
                facilisis.
                In sagittis nibh non arcu viverra, nec imperdiet quam suscipit.
                Sed porta eleifend scelerisque. Vestibulum dapibus quis arcu a
                facilisis.
                In sagittis nibh non arcu viverra, nec imperdiet quam suscipit.
                Sed porta eleifend scelerisque. Vestibulum dapibus quis arcu a
                facilisis.
                In sagittis nibh non arcu viverra, nec imperdiet quam suscipit.
                Sed porta eleifend scelerisque. Vestibulum dapibus quis arcu a
                facilisis.
              </span>
            </div>
          </Collapse>
          </div>
    );
  }
}

class TrackHistory extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render(){
    return(
      <div>
      <h3>Track History</h3> <br />
      <Card>
      <CardHeader>Latest Hash :- </CardHeader>
      <CardBody>
        <p>Item Name :- </p>
        <p>Item Current Location :- </p>
        <Button onClick={this.toggle}>Toggle</Button>
        <Collapse open={this.state.collapse}>
          <div className="p-3 mt-3 border rounded">
            <h5>😍 Now you see me!</h5>
            <span>
              In sagittis nibh non arcu viverra, nec imperdiet quam suscipit.
              Sed porta eleifend scelerisque. Vestibulum dapibus quis arcu a
              facilisis.
            </span>
          </div>
        </Collapse>
      </CardBody>
    </Card>
    <br/ >
    <Card>
    <CardHeader>Latest Hash :- </CardHeader>
    <CardBody>
      <p>Item Name :- </p>
      <p>Item Current Location :- </p>
      <Button onClick={this.toggle}>Toggle</Button>
      <Collapse open={this.state.collapse}>
        <div className="p-3 mt-3 border rounded">
          <h5>😍 Now you see me!</h5>
          <span>
            In sagittis nibh non arcu viverra, nec imperdiet quam suscipit.
            Sed porta eleifend scelerisque. Vestibulum dapibus quis arcu a
            facilisis.
          </span>
        </div>
      </Collapse>
    </CardBody>
  </Card>
    </div>
    );
  }
}

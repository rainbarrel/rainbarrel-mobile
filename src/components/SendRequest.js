import React from 'react';
import { Request } from './global';

class SendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    
  }

  render() {
    const { foundUser } = this.props;

    return (
      <Request requestLabel={foundUser.email} onPress={this.sendRequest}>
        Send
      </Request>
    );
  }
}

export default SendRequest;

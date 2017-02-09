import React, { PropTypes } from 'react';
import style from 'lib/style';

@style({
  container: {
    display: 'flex'
  }
})
class Meeting extends React.Component {

  componentDidMount() {
    const constraints = {
      audio: true,
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(this.handleSuccess.bind(this))
      .catch(console.log);
  }

  handleSuccess(stream) {
    this.videoRef.srcObject = stream;
  }

  render() {
    return (
      <div>
        <video autoPlay ref={(c) => { this.videoRef = c; }} />
      </div>
    );
  }
}

export default Meeting;

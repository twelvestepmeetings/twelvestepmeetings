import React from 'react';
import style from 'lib/style';
import SimpleWebRTC from 'simplewebrtc';

class Meeting extends React.Component {

  state = {
    roomName: ''
  }

  componentDidMount() {
    // const constraints = {
    //   audio: true,
    //   video: true
    // };
    //
    // navigator.mediaDevices.getUserMedia(constraints)
    //   .then(this.handleSuccess.bind(this))
    //   .catch(console.log);

    this.webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: this.local,
      // the id/element dom element that will hold remote videos
      remoteVideosEl: this.remotes,
      // immediately ask for camera access
      autoRequestMedia: true
    });

    this.webrtc.on('videoAdded', this.addVideo);
    this.webrtc.on('videoRemoved', this.removeVideo);
    this.webrtc.on('readyToCall', this.readyToCall);
  }

  addVideo = (video, peer) => {
    console.log('video added', peer);
    //  console.log(this.refs.remotes);
    var remotes = this.remotes;
    console.log(remotes);
    if (remotes) {

      var container = document.createElement('div');
      container.className = 'videoContainer';
      container.id = 'container_' + this.webrtc.getDomId(peer);
      container.appendChild(video);
      // suppress contextmenu
      video.oncontextmenu = function () {
        return false;
      };
      console.log(container);
      remotes.appendChild(container);
    }
  }

  removeVideo = (video, peer) => {
    console.log('video removed ', peer);
    var remotes =this.remotes;
    var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      remotes.removeChild(el);
    }
  }

  readyToCall = () => {
    const { meetingId } = this.props.match.params;
    return this.webrtc.joinRoom(meetingId);
  }

  // handleSuccess(stream) {
  //   this.videoRef.srcObject = stream;
  // }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.roomName}
          onChange={event => this.setState({ roomName: event.target.value })}
        />
        <video autoPlay ref={(c) => { this.local = c; }} />
        <div ref={(c) => { this.remotes = c; }} />
      </div>
    );
  }
}

export default style({
  container: {
    display: 'flex'
  }
})(Meeting);

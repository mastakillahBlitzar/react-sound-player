import React from 'react';
import './control-player-bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

class ControlPlayerBar extends React.Component {

  playPause = () => {
    console.log('play pause');
    this.props.onplay({
      button: this.props.playpauseicon
    });
  }

  playPrevious = () => {
    console.log('play prev');
    this.props.onback({
      button: this.props.playpauseicon
    });
  }

  playNext = () => {
    console.log('play next');
    this.props.onnext({ button: this.props.playpauseicon });
  }

  render() {
    const active = this.props.spin ? 'active' : '';

    const buffering = this.props.buffering === true ? 'buffering' : '';

    const image = this.props.image ? this.props.image : '';

    return (
      <div id="player-content">
        <div id="album-art" className={active + buffering}>
          <img src={image} className="active" alt="art" />
          <div id="buffer-box">Buffering ...</div>
        </div>
        <div id="player-controls">
          <div className="control">
            <div className="button" id="play-previous" onClick={this.playPrevious}>
              <FontAwesomeIcon className="icon" icon={faBackward} />
            </div>
          </div>
          <div className="control">
            <div className="button" id="play-pause-button" onClick={this.playPause}>
              <FontAwesomeIcon className="icon" icon={this.props.playpauseicon} />
            </div>
          </div>
          <div className="control">
            <div className="button" id="play-next" onClick={this.playNext}>
              <FontAwesomeIcon className="icon" icon={faForward} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPlayerBar;
import React from 'react';
import './track-player-bar.css';

class TrackPlayerBar extends React.Component {


    componentDidUpdate() {

    }

    render() {
        const active = this.props.enable ? 'active' : '';
        const track = this.props.currentTrack;
        const trackTimeActive = this.props.trackTimeActive ? 'active' : '';
        //seekBar.width(playProgress + '%');
        const playProgress = this.props.playProgress;
        console.log('pr', playProgress);

        return (
            <div id="player-track" className={active}>
                <div id="album-name">{!!track ? track.album : ''}</div>
                <div id="track-name">{!!track ? track.trackName : ''}</div>
                <div id="track-time" className={trackTimeActive}>
                    <div id="current-time">{this.props.tProgress}</div>
                    <div id="track-length">{this.props.tTime}</div>
                </div>
                <div id="s-area">
                    <div id="ins-time"></div>
                    <div id="s-hover"></div>
                    <div id="seek-bar" style={{ width: playProgress + '%' }}></div>
                </div>
            </div>
        );
    }
}

export default TrackPlayerBar;
import React from 'react';
import './sound-player.css';
import ControlPlayerBar from './control-player-bar/control-player-bar';
import TrackPlayerBar from './track-player-bar/track-player-bar';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { TrackApiService } from '../../services/api/track-api/track-api-service';

class SoundPlayer extends React.Component {

    playPauseButton = faPlay;
    audio;
    bTime;
    nTime = 0;
    buffInterval = null;
    curMinutes;
    curSeconds;
    durMinutes;
    durSeconds;
    playProgress = 0;
    trackTimeActive = false;
    isBuffering = false;
    trackEnabled = false;

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            tracks: undefined,
            currentTrackIndex: 0,
            trackProgress: '',
            trackLenght: ''
        }
    }

    componentDidMount() {
        this.initPlayer();
    }

    initPlayer() {
        this.getTracks();
        this.audio = new Audio();
        this.audio.loop = false;
        this.audio.addEventListener('timeupdate', () => this.updateCurrTime());
    }

    onPlay = (data) => {
        // toggle state isPlaying
        if (!!this.state.tracks) {
            this.setState(prevState => ({ isPlaying: !prevState.isPlaying }), () => {
                this.trackEnabled = !this.trackEnabled;
                this.playOrPause(data);
            });
        }
    }

    playOrPause(data) {
        if (data.button.iconName === faPlay.iconName) {
            this.playPauseButton = faPause;

            this.playAudio()
        } else {
            this.playPauseButton = faPlay;
            this.isBuffering = false;
            clearInterval(this.buffInterval);
            this.audio.pause();
        }
    }

    playAudio() {
        const track = this.state.tracks[this.state.currentTrackIndex];
        this.preparePlayer();
        this.checkBuffering();
        this.audio.src = track.trackUrl;
        this.trackEnabled = true;
        this.audio.play();
    }

    forceToPlay(data) {
        this.setState(prevState => ({ isPlaying: true }), () => {
            this.trackEnabled = true;
            this.playPauseButton = faPause;
            this.playAudio(this.state.tracks[this.state.currentTrackIndex], data);
        });
    }


    checkBuffering = () => {
        clearInterval(this.buffInterval);
        this.buffInterval = setInterval(() => {
            console.log('bttime', this.nTime);

            if ((this.nTime === 0) || (this.bTime - this.nTime) > 1000)
                this.isBuffering = true;
            else
                this.isBuffering = false;

            this.bTime = new Date();
            this.bTime = this.bTime.getTime();
        }, 100);
    }

    updateCurrTime() {
        this.nTime = new Date();
        this.nTime = this.nTime.getTime();

        this.trackTimeActive = true;

        this.curMinutes = Math.floor(this.audio.currentTime / 60);
        this.curSeconds = Math.floor(this.audio.currentTime - this.curMinutes * 60);

        this.durMinutes = Math.floor(this.audio.duration / 60);
        this.durSeconds = Math.floor(this.audio.duration - this.durMinutes * 60);
        this.playProgress = (this.audio.currentTime / this.audio.duration) * 100;
        if (this.curMinutes < 10)
            this.curMinutes = '0' + this.curMinutes;
        if (this.curSeconds < 10)
            this.curSeconds = '0' + this.curSeconds;

        if (this.durMinutes < 10)
            this.durMinutes = '0' + this.durMinutes;
        if (this.durSeconds < 10)
            this.durSeconds = '0' + this.durSeconds;

        if (isNaN(this.curMinutes) || isNaN(this.curSeconds))
            this.setState((prevState) => ({ trackProgress: '00:00' }));
        else
            this.setState((prevState) => ({ trackProgress: `${this.curMinutes}:${this.curSeconds}` }));

        if (isNaN(this.durMinutes) || isNaN(this.durSeconds))
            this.setState((prevState) => ({ trackLenght: '00:00' }));
        else
            this.setState((prevState) => ({ trackLenght: `${this.durMinutes}:${this.durSeconds}` }));

        if (isNaN(this.curMinutes) || isNaN(this.curSeconds) || isNaN(this.durMinutes) || isNaN(this.durSeconds))
            this.trackTimeActive = false;
        else
            this.trackTimeActive = true;


        if (this.playProgress === 100) {
            this.playPauseButton = faPlay;
            this.playProgress = 0;
            this.setState((prevState) => ({ trackProgress: '00:00' }));
            this.isBuffering = false;
            this.trackEnabled = false;
            clearInterval(this.buffInterval);
        }
    }

    preparePlayer() {
        this.nTime = 0;
        this.bTime = new Date();
        this.bTime = this.bTime.getTime();
    }

    getTracks() {
        const trackService = new TrackApiService();
        trackService.getTracks().then(
            (data) => {
                const _tracks = data.tracks;
                this.setState(prevState => ({ tracks: _tracks }));
            }
        );
    }

    onBack = (data) => {
        console.log('back', data);
        if (!!this.state.tracks) {
            console.log('index', this.state.currentTrackIndex);
            if (this.state.currentTrackIndex === 0) {
                return;
            } else {
                this.setState(prevState => ({ currentTrackIndex: prevState.currentTrackIndex - 1 }), () => {
                    this.forceToPlay(data);
                });
            }
        }
    }

    onNext = (data) => {
        if (!!this.state.tracks) {
            if (this.state.currentTrackIndex === this.state.tracks.length - 1) {
                return;
            } else {
                this.setState(prevState => ({ currentTrackIndex: prevState.currentTrackIndex + 1 }), () => {
                    this.forceToPlay(data);
                });
            }
        }
    }

    render() {
        let currentTrack;
        if (!!this.state.tracks) {
            currentTrack = this.state.tracks[this.state.currentTrackIndex];
        }
        return (
            <div id="player">
                <audio />
                <TrackPlayerBar playProgress={this.playProgress} trackTimeActive={this.trackTimeActive} tTime={this.state.trackLenght} tProgress={this.state.trackProgress} enable={this.trackEnabled} currentTrack={currentTrack} />
                <ControlPlayerBar image={!!currentTrack ? currentTrack.image : ''} buffering={this.isBuffering} onplay={this.onPlay} spin={this.trackEnabled} onback={this.onBack} onnext={this.onNext} playpauseicon={this.playPauseButton} />
            </div>
        );
    }
}

export default SoundPlayer;
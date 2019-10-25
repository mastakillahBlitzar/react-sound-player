import { TrackInfo } from '../../../components/sound-player/models/player.model';
export class TrackApiService {

    tracks: TrackInfo[] = [
        {
            album: 'Amanecer',
            trackName: 'Bomba Estereo - To My Love',
            albumArtWork: '_1',
            trackUrl: 'https://d2tml28x3t0b85.cloudfront.net/tracks/stream_files/000/696/722/original/Bomba%20Est%C3%A9reo%20-%20To%20My%20Love%20%28Moombahton%20Bootleg%29.mp3?1514668785',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Amanecer_album_cover.jpg/220px-Amanecer_album_cover.jpg'
        },
        {
            album: 'Me & You',
            trackName: 'Alex Skrindo - Me & You',
            albumArtWork: '_2',
            trackUrl: 'https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3',
            image: 'http://k003.kiwi6.com/hotlink/ifpd9xk6n4/2.jpg'
        },
        {
            album: 'Electro Boy',
            trackName: 'Kaaze - Electro Boy',
            albumArtWork: '_3',
            trackUrl: 'https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3',
            image: 'http://k003.kiwi6.com/hotlink/36u2tfrwiu/3.jpg'
        },
        {
            album: 'Home',
            trackName: 'Jordan Schor - Home',
            albumArtWork: '_4',
            trackUrl: 'http://k003.kiwi6.com/hotlink/gt2rduy0mo/3.mp3',
            image: 'http://k003.kiwi6.com/hotlink/l633hnztuz/4.jpg'
        },
        {
            album: 'Proxy (Original Mix)',
            trackName: 'Martin Garrix - Proxy',
            albumArtWork: '_5',
            trackUrl: 'http://k003.kiwi6.com/hotlink/421ezo6l38/4.mp3',
            image: 'http://k003.kiwi6.com/hotlink/0yp24xn1o8/5.jpg'
        }
    ]

    async getTracks() {
        let response = await fetch('https://app.fakejson.com/q', {
            method: 'POST',
            body: this.buildRq(),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data: TrackInfo[] = await response.json();
        console.log('service data', data);

        return data;
    }

    buildRq() {
        return JSON.stringify({
            token: "sjCtD8UmU0GIaa9R3Wd-HQ",
            data: {
                tracks: this.tracks
            }
        });
    }
}

export default TrackApiService;
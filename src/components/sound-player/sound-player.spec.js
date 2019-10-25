import SoundPlayer from '../sound-player/sound-player';
import { shallow } from 'enzyme';
import React from 'react';

it('should set nTime to 0', () => {
    const soundPlayer = shallow(<SoundPlayer />);
    soundPlayer.instance().preparePlayer();
    expect(soundPlayer.instance().nTime).toEqual(0);
});
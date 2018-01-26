import React from 'react';
import { storiesOf } from '@storybook/react';
import {Currency} from 'mdt-core-components';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount } from 'enzyme';
import expect from 'expect';
import {Input, Label} from 'reactstrap';

const stories = storiesOf('Currency', module);

stories.addWithJSX('$ US', () => {
    const props = {
        value: 32.00,
        format: '0,0[.]00',
        language: 'en-US'
    };
    const wrapper = <Currency {...props}/>;
    specs(() => describe('Currency', () => {
        const wrapped = mount(wrapper);
        it('Should return render', () => {
            expect(wrapped).toBeTruthy();
        });
    }));
    return wrapper;
});

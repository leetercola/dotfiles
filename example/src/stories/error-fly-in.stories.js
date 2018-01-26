import React from 'react';
import { storiesOf } from '@storybook/react';
import {ErrorFlyin} from 'mdt-core-components';
import { Modal } from 'reactstrap';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount } from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Error-Fly-In', module);

stories.addWithJSX('Error with body', () => {
    const props = {
        title: "I'm a modal",
        icon: "error",
        contents: [],
        isOpen: true,
        footer: false,
        hasHeader: true
    };
    const message = "I'm modal body";
    const wrapper = <ErrorFlyin {...props}><p>{message}</p></ErrorFlyin>;
    const wrapped = mount(wrapper);

    specs(() => describe('MDTButton enabled', () => {
        it('Should return a button without label', () => {
            expect(wrapped).toBeTruthy();
        });
    }));
    return wrapper;
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import {InlineModal, MDTModal} from 'mdt-core-components';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { specs, describe, it } from 'storybook-addon-specifications';
import { shallow } from 'enzyme';
import expect from 'expect';

const stories = storiesOf('MDT Modal', module);

stories.addWithJSX('Modal', () => {
    const props = {
        title: "I'm a modal",
        icon: "error",
        contents:[],
        defaultOpen: true,
        footer: false,
        hasHeader: true
    };
    const wrapper = <MDTModal {...props} ><p>I'm modal body</p></MDTModal>;
    const wrapped = shallow(wrapper);
    specs(() => describe('MDTButton enabled', () => {
        it('Should return a button without label', () => {
            expect(wrapped).toBeTruthy();
        });
    }));
    wrapped.unmount();
    return wrapper;
});

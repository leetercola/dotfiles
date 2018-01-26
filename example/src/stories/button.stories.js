import React from 'react';
import { storiesOf } from '@storybook/react';
import {MDTButton} from 'mdt-core-components';
import { specs, describe, it } from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('MDTButton', module);

stories.addWithJSX('button/enabled', () => {
    const props = {
        type: 'button',
        onClick: () => {},
        disabled: false,
        name: 'mdt-button',
        label: 'click me'
    };
    const wrapper = <MDTButton {...props} />;
    specs(() => describe('MDTButton enabled', () => {
      const wrapped = mount(wrapper);
        it('Should return a button without label', () => {
          expect(wrapped.find('button')).toHaveLength(1);
          expect(wrapped.props().disabled).toBe(false);
        });
    }));
    return wrapper;
});

stories.addWithJSX('button/disabled', () => {
    const props = {
        type: 'button',
        onClick: () => {},
        disabled: true,
        name: 'mdt-button',
        label: 'click me'
    };
    const wrapper = <MDTButton {...props} />;
    specs(() => describe('MDTButton disabled', () => {
      const wrapped = mount(wrapper);
        it('Should return a button without label', () => {
          expect(wrapped.find('button')).toHaveLength(1);
          expect(wrapped.props().disabled).toBe(true);
        });
    }));
    return wrapper;
});

stories.addWithJSX('label/enabled', () => {
    const props = {
        type: 'label',
        onClick: () => {},
        disabled: false,
        name: 'mdt-label',
        label: "I'm a label",
        htmlFor: '.mdt-input'
    };
    const wrapper = <MDTButton {...props} />;
    specs(() => describe('MDTButton label enabled', () => {
      const wrapped = mount(wrapper);
        it('Should return a label enabled', () => {
          expect(wrapped.find('label')).toHaveLength(1);
          expect(wrapped.props().disabled).toBe(false);
        });
    }));
    return wrapper;
});

stories.addWithJSX('label/disabled', () => {
    const props = {
        type: 'label',
        onClick: () => {},
        disabled: true,
        name: 'mdt-label',
        label: "I'm a disabled label",
        htmlFor: '.mdt-input'
    };
    const wrapper = <MDTButton {...props} />;
    specs(() => describe('MDTButton label enabled', () => {
      const wrapped = mount(wrapper);
        it('Should return a label enabled', () => {
          expect(wrapped.find('label')).toHaveLength(1);
          expect(wrapped.props().disabled).toBe(true);
        });
    }));
    return wrapper;
});

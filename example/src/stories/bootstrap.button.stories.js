import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from 'reactstrap';
import { specs, describe, it } from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Bootstrap/button', module);

stories.addWithJSX('button/enabled', () => {
    const props = {
        onClick: () => {},
        color: 'primary',
        disabled: false,
        name: 'mdt-button'
    };
    const wrapper = <Button {...props} >Click Me </Button>;
    specs(() => describe('button enabled', () => {
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
        onClick: () => {},
        disabled: true,
        color: 'primary',
        name: 'mdt-button',
        label: 'click me'
    };
    const wrapper = <Button {...props} >Can't click me</Button>;
    specs(() => describe('button disabled', () => {
      const wrapped = mount(wrapper);
        it('Should return a button without label', () => {
          expect(wrapped.find('button')).toHaveLength(1);
          expect(wrapped.props().disabled).toBe(true);
        });
    }));
    return wrapper;
});

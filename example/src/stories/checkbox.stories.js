import React from 'react';
import { storiesOf } from '@storybook/react';
import {Checkbox} from 'mdt-core-components';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount } from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Checkbox', module);

stories.addWithJSX('checked', () => {
    const props = {
        defaultChecked: true
    };
    const wrapper = <Checkbox {...props} />;
    specs(() => describe('Checkbox enabled', () => {
        const wrapped = mount(wrapper);
        it('Should return checked checkbox', () => {
            expect(wrapped.props().defaultChecked).toBe(true);
        });
    }));
    return wrapper;
});

stories.addWithJSX('unchecked', () => {
    const props = {
        defaultChecked: false
    };
    const wrapper = <Checkbox {...props} />;
    specs(() => describe('Checkbox disabled', () => {
        const wrapped = mount(wrapper);
        it('Should return unchecked checkbox', () => {
            expect(wrapped.props().defaultChecked).toBe(false);
        });
    }));
    return wrapper;
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import {BlocArrow} from 'mdt-core-components';
import ReactTestRenderer from 'react-test-renderer';
import { specs, describe, it } from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Bloc-Icon', module);

stories.addWithJSX('On/color 3', () => {
    const props = {
        colorstate: 'on',
        color: 'colorPrimary3'
    };
    const wrapper = <BlocArrow {...props} />;
    specs(() => describe('on color 3', () => {
      const wrapped = mount(wrapper);
        it('should be colorPrimary3', () => {
          expect(wrapped.props().color).toBe('colorPrimary3');
        });
        it('should be on', () => {
          expect(wrapped.props().colorstate).toBe('on');
        });
    }));
    return wrapper;
});

stories.addWithJSX('Off/color 3', () => {
    const props = {
        colorstate: 'off',
        color: 'colorPrimary3'
    };
    const wrapper = <BlocArrow {...props} />;
    specs(() => describe('off color', () => {
        it('should render', () => {
            ReactTestRenderer.create(wrapper).toJSON();
        });
    }));
    return wrapper;
});

stories.addWithJSX('On/colorAccent1', () => {
    const props = {
        colorstate: 'on',
        color: 'colorAccent1'
    };
    const wrapper = <BlocArrow {...props} />;
    specs(() => describe('on color2', () => {
        it('should be on with color 2', () => {
            ReactTestRenderer.create(wrapper).toJSON();
        });
    }));

    return wrapper;
});

stories.addWithJSX('Off/ColorAccent2', () => {
    const props = {
        colorstate: 'off',
        color: 'colorAccent1'
    };
    const wrapper = <BlocArrow {...props} />;
    specs(() => describe('off color', () => {
        it('should render', () => {
            ReactTestRenderer.create(wrapper).toJSON();
        });
    }));
    return wrapper;
});

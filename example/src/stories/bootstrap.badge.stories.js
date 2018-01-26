import React from 'react';
import { storiesOf } from '@storybook/react';
import {Badge} from 'reactstrap';
import ReactTestRenderer from 'react-test-renderer';
import { specs, describe, it } from 'storybook-addon-specifications';
import expect from 'expect';

const stories = storiesOf('Bootstrap/badge', module);
const _badge = <span className='icon-camera'></span>;
const wrapper = <Badge pill>{_badge}</Badge>;

stories.addWithJSX('With a badge', () => {
    specs(() => describe('with a badge', () => {
        it('should render', () => {
            ReactTestRenderer.create(wrapper).toJSON();
        });
    }));
    return wrapper;
});

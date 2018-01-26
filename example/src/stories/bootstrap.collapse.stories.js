import React from 'react';
import {storiesOf} from '@storybook/react';
import {Collapse, Card, CardBody, Button} from 'reactstrap';
import {specs, describe, it} from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Collapse', module);

stories.addWithJSX('expanded', () => {
    const props = {
        isOpen: true
    };
    const wrapper = <div><Button color="primary" style={{ marginBottom: '1rem' }}>Toggle</Button><Collapse {...props}><Card><CardBody>I'm hidden text unfolded</CardBody></Card></Collapse></div>;
    const wrapped = mount(wrapper);
    specs(() => describe('', () => {
        it('should render', () => {
            expect(wrapped).toBeTruthy();
        });
    }));
    return wrapper;
});

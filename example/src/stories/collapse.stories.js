import React from 'react';
import {storiesOf} from '@storybook/react';
import {MDTCollapse} from 'mdt-core-components';
import {specs, describe, it} from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('MDTCollapse', module);

stories.addWithJSX('expanded', () => {
    const props = {
      defaultOpen: true,
    };
    const wrapper = <MDTCollapse {...props}><p>I'm some more body context thats been unfolded</p></MDTCollapse>;
    specs(() => describe('collapsed', () => {
        const wrapped = mount(wrapper);
        it('Should render', () => {
            expect(wrapped).toBeTruthy();
        });
    }));
    return wrapper;
});

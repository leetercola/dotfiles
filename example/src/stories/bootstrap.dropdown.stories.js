import React from 'react';
import {storiesOf} from '@storybook/react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {specs, describe, it} from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Bootstrap/Dropdown', module);

stories.addWithJSX('Dropdown/closed', () => {
    return (
      <ButtonDropdown isOpen={false} toggle="toggle function">
        <DropdownToggle caret>
          Button Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    )
});

stories.addWithJSX('Dropdown/open', () => {
    return (
      <ButtonDropdown isOpen={true} toggle="toggle function">
        <DropdownToggle caret>
          Button Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    )
});

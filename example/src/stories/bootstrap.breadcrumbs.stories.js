import React from 'react';
import {storiesOf} from '@storybook/react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {specs, describe, it} from 'storybook-addon-specifications';
import {mount} from 'enzyme';
import expect from 'expect';

const stories = storiesOf('Bootstrap/Breadcrumbs', module);

stories.addWithJSX('Breadcrumbs', () => {
  return (<div>
    <Breadcrumb tag="nav">
      <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
      <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
      <BreadcrumbItem tag="a" href="#">Data</BreadcrumbItem>
      <BreadcrumbItem active="active" tag="span">Bootstrap</BreadcrumbItem>
    </Breadcrumb>
  </div>)
});

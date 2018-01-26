import React from 'react';
import {storiesOf} from '@storybook/react';
import ReactTestRenderer from 'react-test-renderer';
import {Card, CardTitle, CardText, CardColumns, CardHeader, CardFooter, Container, Badge, Row, Col} from 'reactstrap';
import {Styles, ClickToCopy} from 'mdt-core-components';

const stories = storiesOf('Colors and Typography', module);

const Colors = () => (
  <Container>
    <h1>Primary Colors</h1>
    <br />
    <CardColumns>
      <Card body inverse style={{backgroundColor:Styles.colorPrimary1}} >
        <CardTitle>{Styles.colorPrimary1}</CardTitle>
        <CardText>$colorPrimary1</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.colorPrimary2}} >
        <CardTitle>{Styles.colorPrimary2}</CardTitle>
        <CardText>$colorPrimary2</CardText>
      </Card>
      <Card  body inverse style={{backgroundColor:Styles.colorPrimary3}}>
        <CardTitle>{Styles.colorPrimary3}</CardTitle>
        <CardText>$colorPrimary3</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.colorPrimary4}}>
        <CardTitle>{Styles.colorPrimary4}</CardTitle>
        <CardText>$colorPrimary4</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.colorPrimary5}}>
        <CardTitle>{Styles.colorPrimary5}</CardTitle>
        <CardText>$colorPrimary5</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.colorPrimary6}}>
        <CardTitle>{Styles.colorPrimary6}</CardTitle>
        <CardText>$colorPrimary6</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.colorPrimary7}}>
        <CardTitle>{Styles.colorPrimary7}</CardTitle>
        <CardText>$colorPrimary7</CardText>
      </Card>
    </CardColumns>
    <h1>Primary Neutrals</h1>
    <br />
    <CardColumns>
      <Card style={{backgroundColor:Styles.colorPrimaryNeutral0}}>
        <CardTitle>{Styles.colorPrimaryNeutral0}</CardTitle>
        <CardText>$colorPrimaryNeutral0</CardText>
      </Card>
      <Card style={{backgroundColor:Styles.colorPrimaryNeutral1}}>
        <CardTitle>{Styles.colorPrimaryNeutral1}</CardTitle>
        <CardText>$colorPrimaryNeutral1</CardText>
      </Card>
      <Card style={{backgroundColor:Styles.colorPrimaryNeutral2}}>
        <CardTitle>{Styles.colorPrimaryNeutral2}</CardTitle>
        <CardText>$colorPrimaryNeutral0</CardText>
      </Card>
      <Card style={{backgroundColor:Styles.colorPrimaryNeutral3}}>
        <CardTitle>{Styles.colorPrimaryNeutral3}</CardTitle>
        <CardText>$colorPrimaryNeutral3</CardText>
      </Card>
    </CardColumns>
    <h1>Accent Colors</h1>
    <br />
    <CardColumns>
      <Card body inverse style={{backgroundColor:Styles.colorAccent1}}>
        <CardTitle>{Styles.colorAccent1}</CardTitle>
        <CardText>$colorAccent1</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.colorAccent2}}>
        <CardTitle>{Styles.colorAccent2}</CardTitle>
        <CardText>$colorAccent2</CardText>
      </Card><Card body inverse style={{backgroundColor:Styles.colorAccent3}}>
        <CardTitle>{Styles.colorAccent3}</CardTitle>
        <CardText>$colorAccent3</CardText>
      </Card><Card body inverse style={{backgroundColor:Styles.colorAccent4}}>
        <CardTitle>{Styles.colorAccent4}</CardTitle>
        <CardText>$colorAccent4</CardText>
      </Card><Card body inverse style={{backgroundColor:Styles.colorAccent5}}>
        <CardTitle>{Styles.colorAccent5}</CardTitle>
        <CardText>$colorAccent5</CardText>
      </Card><Card body inverse style={{backgroundColor:Styles.colorAccent6}}>
        <CardTitle>{Styles.colorAccent6}</CardTitle>
        <CardText>$colorAccent6</CardText>
      </Card>
    </CardColumns>
    <h1>Bootstrap color choices</h1>
    <br />
    <CardColumns>
      <Card body inverse style={{backgroundColor:Styles.brandPrimary}}>
        <CardTitle>{Styles.brandPrimary}</CardTitle>
        <CardText>$brand-primary = $colorPrimary1</CardText>
      </Card>
      <Card body inverse color="success">
        <CardTitle>{Styles.brandSuccess}</CardTitle>
        <CardText>$brand-success = $colorAccent5</CardText>
      </Card>
      <Card body inverse color="info">
        <CardTitle>{Styles.brandInfo}</CardTitle>
        <CardText>$brand-info = $colorAccent6</CardText>
      </Card>
      <Card body inverse color="warning">
        <CardTitle>{Styles.brandWarning}</CardTitle>
        <CardText>$brand-warning = $colorAccent3</CardText>
      </Card>
      <Card body inverse color="danger">
        <CardTitle>{Styles.brandDanger}</CardTitle>
        <CardText>$brand-danger = $colorAccentAlternate3</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.brandInverse}}>
        <CardTitle>{Styles.brandInverse}</CardTitle>
        <CardText>$brand-inverse = $colorSecondaryNeutralAlternate1</CardText>
      </Card>
      <Card body inverse style={{backgroundColor:Styles.secondary}}>
        <CardTitle>{Styles.secondary}</CardTitle>
        <CardText>$secondary = $colorPrimary2</CardText>
      </Card>
    </CardColumns>
  </Container>
)

const Typography = () => (
  <Container>
    <Row>
      <Col xs="12">
        <Row>
          <Col xs="6">
            <h1>Typography</h1>
          </Col>
          <Col xs="6">
            <p>Any text can be made a link. The color #00A9E0 (or #0085ca when on light blue) indicates interactivity and can be used with almost any of these specified type styles to indicate that it’s actionable.</p>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <h2>Headings and Body Copy</h2>
            <h4>Font family: Effra</h4>
            <hr />
          </Col>
          <Col xs="6">
            <h2>Links</h2>
            <hr />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col xs="6">
        <Row>
          <Col xs="6">
            <h2><Badge color="secondary">2</Badge>Heading 2</h2>
            <p>Large View: 26px / Regular</p>
            <p>Small View: 16px / Regular</p>

            <h4><Badge color="secondary">4</Badge>Heading 4 & Body copy</h4>
            <p>16px / Regular or Medium / 26px Line Height</p>

            <h5><Badge color="secondary">5</Badge>Heading 5 & Form Fields Input Text</h5>
            <p>14px / Medium</p>
            <p> 14px / Regular <Badge style={{backgroundColor: Styles.colorPrimary7}} pill>#001e46 <ClickToCopy>$colorPrimary7</ClickToCopy></Badge></p>

            <h6>
              <Badge color="secondary">6</Badge>Heading 6 & Body Copy
            </h6>
            <p>12px / Medium</p>

            <p><Badge color="secondary">8</Badge>Smaller Body Copy (general body text & table text)</p>
            <p><strong>Large View:</strong> 14px / Regular / 22px Line Height</p>
            <p><strong>Small View:</strong> 12px / Regular</p>

            <p className="text-large"><Badge color="secondary">9</Badge>Sidebar Text & Column Sub-Headings - Gray</p>
            <p>13px / Regular / 18px Line Height</p>
          </Col>
          <Col xs="6">
            <p><Badge color="secondary">11</Badge>Item Label Data Display</p>
            <p>#888b8d / #001e46</p>

            <h2>Headings</h2>
            <Card body inverse style={{backgroundColor:Styles.colorGrayTones1}} >
              <CardTitle>{Styles.colorGrayTones1}</CardTitle>
              <CardText>$colorGrayTones1</CardText>
            </Card>
            <Card body inverse style={{backgroundColor:Styles.colorPrimary1}} >
              <CardTitle>{Styles.colorPrimary1}</CardTitle>
              <CardText>$colorPrimary1</CardText>
            </Card>

            <h2>Body Copy</h2>
            <Card body inverse style={{backgroundColor:Styles.colorGrayTones1}} >
              <CardTitle>{Styles.colorGrayTones1}</CardTitle>
              <CardText>$colorGrayTones1</CardText>
            </Card>

            <h2>Legal text or help text</h2>
            <Card body inverse style={{backgroundColor:Styles.colorGrayTones2}} >
              <CardTitle>{Styles.colorGrayTones2}</CardTitle>
              <CardText>$colorGrayTones1</CardText>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs="6">
        <Row>
          <Col xs="6">
            <h2>BASIC IN-LINE LINK:</h2>
            <p>there is a <a href="javascript:void(0)">link</a> in this sentence.</p>
            <p>#00A9E0 / underlined / bold</p>

            <h2>CALL-TO-ACTIONS:</h2>
            <p>VIEW FULL DETAILS</p>
            <p>#00A9E0 / bold</p>
            <p>Often includes arrow icon</p>

            <h2>TEXT LINK:</h2>
            <p>This is a text link</p>
            <p>#00A9E0 / bold</p>

            <h2>HOVER ON ALL TEXT LINKS:</h2>
            <p>This is a text link on hover</p>
            <p>Underlined / #03c3ef / bold</p>

            <h2>VISITED TEXT LINKS:</h2>
            <p>This is a visited text link</p>
            <p>#0085ca / bold</p>
          </Col>
          <Col xs="6">
            <h2>Links on White or gray</h2>
            <Row>
              <Col xs="6" className=""></Col>
              <Col xs="6"></Col>
              <div>
                #00A9E0
                Medium
                Blue
              </div>
            </Row>

            <h2>Links on Light Blue</h2>
            <p>#0085CA</p>
            <p>Cobalt Blue</p>

            <h2>Links on Navy Blue</h2>
            <p>#71C5E8</p>
            <p>Sky Blue</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
)
stories.add('Color Palette', () => (<Colors />))
stories.add('Typography', () => (<Typography />))

import React from 'react';
import Button from '../assets/jsx/components/Button.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

test('Button renders', () => {
  const component = renderer.create(<Button></Button>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button interactions', () => {
  const changeSpy = jest.fn();
  const input = shallow(<Button submit={changeSpy}></Button>);
  input.find("button").simulate("click");
  expect(changeSpy).toHaveBeenCalledTimes(1);
});

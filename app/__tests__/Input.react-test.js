import React from 'react';
import Input from '../assets/jsx/components/Input.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

test('Input renders', () => {
  const component = renderer.create(<Input></Input>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input can change', () => {
  const component = renderer.create(<Input type="text" label="Username:" valChange={() => 'valChange'} val="val"/>);
  let tree = component.toJSON();
  let onChange = tree.children[2].props.onChange();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0]).toBe("Username:");
  expect(onChange).toBe('valChange');
});

test('Password can change', () => {
  const component = renderer.create(<Input type="password" label="Password:" valChange={() => 'passwordChange'} val="val"/>);
  let tree = component.toJSON();
  let onChange = tree.children[2].props.onChange();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0]).toBe("Password:");
  expect(onChange).toBe('passwordChange');
});

test('Interaction', () => {
  const changeSpy = jest.fn();
  const input = shallow(
      <Input name="test" type="text" label="text" valChange={changeSpy} val="val"/>
  );
  input.find("input").simulate("change", "new text");
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(changeSpy).toHaveBeenCalledWith("new text")
});

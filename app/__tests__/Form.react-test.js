import React from 'react';
import Form from '../assets/jsx/components/Form.jsx';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

test('Form renders', () => {
  const component = renderer.create(<Form></Form>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('User Form', () => {
  const submitSpy = jest.fn();
  const inputChangeSpy = jest.fn();
  const passwordChangeSpy = jest.fn();
  const form = mount(
      <Form identifier="userForm" onSubmit={submitSpy}
            onInputChange={inputChangeSpy}
            onPasswordChange={passwordChangeSpy} username=''
            password=''></Form>
  );
  expect(form.props()).toEqual({"identifier": "userForm", "onInputChange": inputChangeSpy, "onPasswordChange": passwordChangeSpy, "onSubmit": submitSpy, "password": "", "username": ""})
  form.find("input").forEach((input) => {
    input.simulate("change", "new val");
  });
  expect(inputChangeSpy).toHaveBeenCalled();
  expect(passwordChangeSpy).toHaveBeenCalled();
  form.find('form').simulate('submit');
  expect(submitSpy).toHaveBeenCalled();
});

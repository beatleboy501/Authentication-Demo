import React from 'react';
import Main from '../assets/jsx/components/Main.jsx';
import renderer from 'react-test-renderer';

test('Main renders', () => {
  const component = renderer.create(<Main></Main>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

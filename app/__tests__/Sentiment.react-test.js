import React from 'react';
import Sentiment from '../assets/jsx/components/Sentiment.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

test('Sentiment renders', () =>{
  const component = renderer.create(<Sentiment></Sentiment>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sentiment interactions', () => {
  const submitSpy = jest.fn();
  const sentiment = shallow(<Sentiment></Sentiment>);
  expect(sentiment.state()).toEqual({ token: '', sentence: ''})
  sentiment.find('[name="token"]').simulate("change", {target : {value : "new token"}})
  expect(sentiment.state()).toEqual({ token: 'new token', sentence: ''})
  sentiment.find('[name="sentence"]').simulate("change", {target : {value : "new sentence"}})
  expect(sentiment.state()).toEqual({ token: 'new token', sentence: 'new sentence'})
  sentiment.find('form').simulate('submit', { preventDefault : submitSpy });
  expect(submitSpy).toHaveBeenCalledTimes(1);
});

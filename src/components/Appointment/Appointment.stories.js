import React from 'react';

import { storiesOf } from '@storybook/react';

import Appointment from './index';
import Header from './header';

storiesOf('Appointment', module)
.addParameters({
  backgrounds: [{ name: 'white', value: '#fff', default: true }]
})
.add('Appointment', () => (
  <Appointment/>
  ))
.add('Appointment with Time', () => (
  <Appointment time='12pm'/>
))
.add('Header', () => (
  <Header time='12pm'/>

));
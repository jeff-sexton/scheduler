import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Appointment from './index';
import Header from './header';
import Empty from './Empty';
import Show from './Show';

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

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

))
.add('Empty', () => (
  <Empty onAdd={() => action('onAdd')('Add')}/>
))
.add('Show', () => (
  <Show 
    student='Lydia Miller-Jones'
    interviewer={interviewer}
    onEdit={action("onEdit")}
    onDelete={action("onDelete")}
  />
))
;
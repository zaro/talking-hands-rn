import WordsIndex from './words-index';

export default {
  lessons:[
    {
      'name': 'Урок 1- искам',
    },{
      'name': 'Урок 1-подай',
    },{
      'name': 'Урок 2- искам',
    },{
      'name': 'Урок 2- подай',
    },{
      'name': 'Урок 3- искам',
    },{
      'name': 'Урок 3- подай',
    },{
      'name': 'Урок 4- отивам',
    },
  ],
  lessonData: {
  'Урок 1- искам': require('./urok-1--iskam.js'),'Урок 1-подай': require('./urok-1-poday.js'),'Урок 2- искам': require('./urok-2--iskam.js'),'Урок 2- подай': require('./urok-2--poday.js'),'Урок 3- искам': require('./urok-3--iskam.js'),'Урок 3- подай': require('./urok-3--poday.js'),'Урок 4- отивам': require('./urok-4--otivam.js'),
  },
  getLessonData(lessonName) {
    return this.lessonData[lessonName].default;
  }
};
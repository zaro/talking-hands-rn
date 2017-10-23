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
    },
  ],
  lessonData: {
  'Урок 1- искам': require('./urok-1--iskam.js'),'Урок 1-подай': require('./urok-1-poday.js'),'Урок 2- искам': require('./urok-2--iskam.js'),'Урок 2- подай': require('./urok-2--poday.js'),
  },
  getLessonData(lessonName) {
    return this.lessonData[lessonName].default;
  }
};
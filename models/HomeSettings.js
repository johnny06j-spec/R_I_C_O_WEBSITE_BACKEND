const mongoose = require('mongoose');

const homeSettingsSchema = new mongoose.Schema({
  stats: [
    {
      value: { type: String, default: '700+' },
      label: { type: String, default: 'STUDENTS' },
      subtext: { type: String, default: 'Future leaders in the making' }
    },
    {
      value: { type: String, default: '45+' },
      label: { type: String, default: 'QUALIFIED TEACHERS' },
      subtext: { type: String, default: 'Dedicated and experienced' }
    },
    {
      value: { type: String, default: '98%' },
      label: { type: String, default: 'SUCCESS RATE' },
      subtext: { type: String, default: 'Consistent academic excellence' }
    },
    {
      value: { type: String, default: '15+' },
      label: { type: String, default: 'YEARS OF EXCELLENCE' },
      subtext: { type: String, default: 'A legacy of impact' }
    }
  ],
  aboutTitle: { type: String, default: 'Nurturing Minds. Building Leaders.' },
  aboutDescription: { 
    type: String, 
    default: "At Radiant Intellectuals' College, we are committed to raising a generation of learners who excel academically..." 
  },
  aboutImageUrl: { type: String, default: '' },
  whatsappNumber: { type: String, default: '2348000000000' }
}, { timestamps: true });

module.exports = mongoose.model('HomeSettings', homeSettingsSchema);
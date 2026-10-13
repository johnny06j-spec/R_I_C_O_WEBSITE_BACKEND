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
  // Homepage "About Our School" Card
  aboutTitle: { 
    type: String, 
    default: 'Nurturing Minds. Building Leaders.' 
  },
  aboutDescription: { 
    type: String, 
    default: "At Radiant Intellectuals' College, we are committed to raising a generation of learners who excel academically, demonstrate strong moral values and become purposeful leaders in their communities and the world." 
  },
  aboutImageUrl: { 
    type: String, 
    default: '' 
  },
  // About Page "Principal's Welcome" Section
  principalTitle: { 
    type: String, 
    default: 'Building a Legacy of Intellectual & Character Excellence' 
  },
  principalDescription: { 
    type: String, 
    default: "At Radiant Intellectuals' College, we believe that true education reaches beyond academic scores. It shapes the mind, strengthens moral character, and equips young individuals to lead purposefully in an evolving world.\n\nFounded on unwavering ethical principles and a dedication to world-class learning, our institution provides a secure, modern, and supportive environment where every student is inspired to discover their potential." 
  },
  principalImageUrl: { 
    type: String, 
    default: '' 
  },
  // Global WhatsApp Support
  whatsappNumber: { 
    type: String, 
    default: '2348000000000' 
  }
}, { timestamps: true });

module.exports = mongoose.model('HomeSettings', homeSettingsSchema);
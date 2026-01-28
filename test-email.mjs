import { Resend } from 'resend';
const resend = new Resend('re_Q45MfVGU_2wBryNvy1okNxf5WMuiyJjEK');
resend.emails.send({
  from: 'Prime Agro Farm <noreply@prime-agrofarms.com>',
  to: 'jasiimwe707@gmail.com',
  subject: 'Test Email',
  html: '<p>This is a test email to verify Resend configuration.</p>'
}).then(res => {
  console.log('SUCCESS:', JSON.stringify(res, null, 2));
}).catch(err => {
  console.error('ERROR:', JSON.stringify(err, null, 2));
});

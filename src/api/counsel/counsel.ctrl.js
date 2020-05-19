const nodemailer = require('nodemailer');


exports.register = async (ctx) => {
  const counsel = ctx.request.body;

  console.log(counsel);
  console.log(process.env.GMAIL_USER);
  console.log(process.env.GMAIL_PASS);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  try {
    const attendance = counsel.isAttendance ? '출석하고 있음' : counsel.nonattendancePeriodLabel[counsel.nonattendancePeriodLevel];

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.COUNSELOR,
      subject: `상담 신청 - ${counsel.username}`,
      html: `
      <h1>상담 내용</h1>
      <p>${counsel.contents}</p>
      <h3>이름</h3>
      <p>${counsel.username}</p>
      <h3>연락처</h3>
      <p>${counsel.contact}</p>
      <h3>신앙 경험</h3>
      <p>${counsel.experienceLabel[counsel.experienceLevel]}</p>
      <h3>출석 여부</h3>
      <p>${attendance}</p>
      `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        throw error;
      }
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  transporter.close();

  ctx.status = 200;
}

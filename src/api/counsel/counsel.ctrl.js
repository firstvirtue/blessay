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

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.COUNSELOR,
      subject: `상담 신청 - ${counsel.username}`,
      html: `
      <h1>상담 내용</h1>
      <p>${counsel.contents}</p>
      <h2>이름</h2>
      <p>${counsel.username}</p>
      <h2>연락처</h2>
      <p>${counsel.contact}</p>
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

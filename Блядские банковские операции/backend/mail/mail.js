import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASS
  }
})

class Mailer{
  async sendReceipt(userMail, moneyAmount){
    await transport.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: userMail,
      subject: 'Money transaction receipt',
      html: `<h1>Money transfering</h1>
      <p>Transaction was made on :<b>${new Date().toISOString()}</b></p>
      <p>With total sum of ${moneyAmount} ukrainian tugricks</p>
      <p>If it wasn't you, please, contact us</p>
      <p>800-530-16-29</p>
      `
    })
  }

  async sendConfirmationCode(mail, code){
    await transport.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: mail,
      subject: 'Please, confirm your account',
      html: `<h1>Email Confirmation</h1>
      <h2>Hello, ${mail}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:5000/api/confirm/${code}> Click here</a>
      </div>`,
    })
  }
}

export default new Mailer()
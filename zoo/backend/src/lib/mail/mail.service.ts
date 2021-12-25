import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
class Mailer{
  private static readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thezoomailer.2021@gmail.com',
      pass: 'aasdfqwerasdfasdf'
    }
  });

  async sendMail(mailAdress, name, code){
    return await Mailer.transporter.sendMail({
      from: 'thezoomailer.2021@gmail.com',
      to: mailAdress,
      subject: `TheZoo квиток`,
      html: `<h1>Привіт, ${name}!</h1>
<h1>ваш код: ${code}</h1>
<h5>Дякую за використання нашим сервісом з бронювання білетами.</h5>`,
    })
  }
}

const mailer = new Mailer()

export { mailer, Mailer }

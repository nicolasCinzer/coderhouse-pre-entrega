import { nodemailerEmail, nodemailerPw } from '../config/config.js'
import { createTransport } from 'nodemailer'

export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: nodemailerEmail,
    pass: nodemailerPw
  }
})

export const sendTicketMail = async ({ to, ticketCode, totalItems, totalCost, attachments }) => {
  const mailOptions = {
    from: 'pichichi@ecommerce.com.ar',
    to,
    subject: `Ticket de Compra Generado - COD:: ${ticketCode}`,
    html: `
      <h2>Compra realizada con exito!</h2>
      <p>Se compraron un total de ${totalItems} productos</p>
      <p>Total: <strong>$${totalCost}</strong></p>
      <p>Gracias por su compra</p>
    `,
    attachments
  }

  const email = await transporter.sendMail(mailOptions)

  return email
}

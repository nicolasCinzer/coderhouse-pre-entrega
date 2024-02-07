import { nodemailerEmail, nodemailerPw } from '../config/config.js'
import { createTransport } from 'nodemailer'

const transporter = createTransport({
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

export const resetPasswordEmail = async ({ to, url }) => {
  const mailOptions = {
    from: 'pichichi@ecommerce.com.ar',
    to,
    subject: `Recuperacion de Contraseña`,
    html: `
      <h2>Recuperacion de Contraseña</h2>
      <p>Se ha solicitado una recuperacion de contraseña desde este email.</p>
      <p><strong>Tiene 1 hora para realizar esta accion. En caso de no realizarlo, solicite otra recuperacion.</strong></p>
      <p>Para completar la solicitud, entre en el siguiente link:</p>
      <p>${url}</p>
    `
  }

  const email = await transporter.sendMail(mailOptions)

  return email
}

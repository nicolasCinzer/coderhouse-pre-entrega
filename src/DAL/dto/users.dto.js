export class UsersDTO {
  constructor({ _id, first_name, last_name, email, age, password, cart, role = 'user', isGithub = false }, allowSensitive, isResponse) {
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.age = age
    this.cart = cart._id
    this.role = role

    if (allowSensitive) {
      this.password = password
      this.isGithub = isGithub
    }

    if (isResponse) {
      this.id = _id
      this.full_name = `${first_name} ${last_name}`
    }
  }

  static request = user => {
    return new UsersDTO(user, true, false)
  }

  static response = user => {
    return new UsersDTO(user, false, true)
  }
}

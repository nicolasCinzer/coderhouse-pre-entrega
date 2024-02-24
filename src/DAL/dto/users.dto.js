export class UsersDTO {
  constructor({ _id, first_name, last_name, email, age, password, cart, role = 'user', isGithub = false, documents, acceptable_premium }, isRequest) {
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.age = age
    this.cart = cart._id
    this.role = role

    if (isRequest) {
      this.password = password
      this.isGithub = isGithub
    }

    if (!isRequest) {
      this.documents = documents
      this.acceptable_premium = acceptable_premium
      this.id = _id
      this.full_name = `${first_name} ${last_name}`
    }
  }

  static request = user => {
    return new UsersDTO(user, true, false)
  }

  static response = user => {
    return new UsersDTO(user, false)
  }
}

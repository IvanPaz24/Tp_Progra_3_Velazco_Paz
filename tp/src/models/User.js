class User {
  constructor(id, nombre, email, password, rol = 'cliente') {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

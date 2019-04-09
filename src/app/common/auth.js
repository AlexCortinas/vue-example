import { HTTP } from './http-common'

// aquí guardaremos los datos de autenticación y una serie de métodos helpers públicos
const store = {
  user: {
    authority: '',
    login: '',
    logged: false
  },
  login,
  logout,
  getToken,
  isAdmin,
  isAuthenticationChecked: _checkAuthentication()
}

function login(credentials) {
  return HTTP.post('authenticate', credentials)
    .then(response => {
      _saveToken(response.data.token)
      return _authenticate()
    })
}

function logout() {
  _removeToken()
  store.user.login = ''
  store.user.authority = ''
  store.user.logged = false
}

function getToken() {
  return localStorage.getItem('token')
}

function isAdmin() {
  return store.user.authority == 'ADMIN'
}

// usamos localStorage para guardar el token, de forma
// que sea persistente (se inhabilita con el tiempo o
// al hacer logout)
function _saveToken(token) {
  localStorage.setItem('token', token)
}

function _removeToken() {
  localStorage.removeItem('token')
}

// si tenemos el token guardado, esta petición se hará
// con el filtro definido en http-common y por tanto nos
// devolverá el usuario logueado
function _authenticate() {
  return HTTP.get('account').then(response => {
    store.user.login = response.data.login
    store.user.authority = response.data.authority
    store.user.logged = true
    return store.user
  })
}

function _checkAuthentication() {
  return new Promise(res => {
    if (getToken()) {
      _authenticate().catch(() => logout()).finally(() => res(true))
    } else {
      res(true)
    }
  })
}

export default store

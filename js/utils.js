// Defindo referências para elementos da página
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')
var emailVerified = document.getElementById('emailVerified')
var passwordReset = document.getElementById('passwordReset')
var userName = document.getElementById('userName')
var userImg = document.getElementById('userImg')



// Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(register) //Esconder atalho para registro conta
  hideItem(passwordReset) // Esconder a opção de redefinição de senha
  showItem(access) // Mostraratalho para acesso conta 
}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar'
  hideItem(access) // Esconder atalho para acesso conta
  showItem(passwordReset) // mostrar a opção de redefinição de senha
  showItem(register) // Mostra atalho para cadastrar conta
}

// Simplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}

// Simplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none'
}

// Mostrar conteudo para os usuários atenticados
function showUserContent(user) {
  console.log(user)
  if (user.emailVerified) {
    emailVerified.innerHTML = 'E-mail verificado'
    hideItem(sendEmailVerificationDiv)
  } else {
    emailVerified.innerHTML = 'E-mail não verificado'
    showItem(sendEmailVerificationDiv)
  }

  userImg.src = user.photoURL ? user.photoURL : 'imgs/unknownUser.png'
  userName.innerHTML = user.displayName

  userEmail.innerHTML = user.email
  hideItem(auth)
  showItem(userContent)
}

// Mostrar conteudo para os usuários atenticados
function showAuth() {
  authForm.email.value = ''
  authForm.password.value = ''
  hideItem(userContent)
  showItem(auth)
}

//centralizar e traduzir erros
function showError(prefix, error) {
  console.log(error.code)
  hideItem(loading)

  switch (error.code) {
    case 'auth/invalid-email': alert(prefix + ' ' + 'E-mail inválido!')
    break;

    case 'auth/wrong-password': alert(prefix + ' ' + 'Senha inválida!')
    break;

    case 'auth/weak-password': alert(prefix + ' ' + 'Senha deve ter ao menos 6 caracteres!')

    case 'auth/email-already-in-use': alert(prefix + ' ' + 'E-mail já está em uso por outra conta!')
    break;

    case 'auth/popup-closed-by-user': alert(prefix + ' ' + 'O popup de autenticação foi fechado antes da operação ser concluída!')
    

    default: alert(prefix + ' ' + error.mensage)
  }
}

// Atributos extras de configuração de e-mail
var actionCodeSettings = {
  url: 'http://127.0.0.1:5500/Tbr%20site/home/login.html'
}

var database = firebase.database()

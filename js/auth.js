// Traduz para português a autenticação da firebase
firebase.auth().languageCode = 'pt-BR'

// Função que trata a submissão do fomulário de autenticação
authForm.onsubmit = function (event) {
  showItem(loading)
  event.preventDefault()
  if (authForm.submitAuthForm.innerHTML == 'Acessar') {
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
     showError('Falha no acesso: ', error)
    })
  } else {
    firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
      showError('Falha no cadastro  : ', error)
    })
  }
}

// Função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function (user) {
  hideItem(loading)
  if (user) {
    showUserContent(user)
  } else {
    showAuth()
  }
})

// função que permite ao usuario sair da conta dele
function signOut() {
  firebase.auth().signOut().catch(function (error) {
  showError('Falha ao sair da conta: ', error)
  })
}

//Função que permite o usuário  fazer a verificação do email dele
function sendEmailVerification() {
  showItem(loading)
  var user = firebase.auth().currentUser
  user.sendEmailVerification(actionCodeSettings).then(function () {
    alert('E-mail de verificação foi enviado para ' + user.email + '! Verifique a sua caixa de entrada')
  }).catch(function (error) {
    showError('Falha ao enviar mensagem de verificação de e-mail: ', error)
  }).finally(function () {
    hideItem(loading)
  })
}

// Função q perfite o usuário redefinir a senha
function sendPasswordResetEmail(){
  var email = prompt('Redefinir senha! Informe o seu endereço de email.', authForm.email.value)
  if (email) {
    showItem(loading)
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function () {
      alert('E-mail de redefinição de senha foi enviado para ' + email + '.')
    }).catch(function (error) {
      showError('Falha ao enviar e-mail de redefinição de senha: ', error)
    }).finally(function () {
      hideItem(loading)
    })
  } else {
    alert('É preciso preencher o campo de e-mail para redefinir a senha!')
  }
}

// Função q permite a autenticação pelo google
function signInWithGoogle() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider ()).catch(function (error) {
    showError('Falha ao autenticar com o Google: ', error)
  })
}



//funçao que permite atualizar informações de usiarios
function updateUserName() {
  var newUserName = prompt('Informe um novo nome de usuário.', userName.innerHTML)
  if (newUserName && newUserName !='') {
    userName.innerHTML = newUserName
    showItem(loading)
      firebase.auth().currentUser.updateProfile({
      displayName: newUserName
    }).catch(function (error) {
      showError('Falha ao atualizar o nome de usuário: ', error)
    }).finally(function () {
      hideItem(loading)
    })
  } else {
    alert('O nome de usuário não pode ser vazio')
  }
}

// Função que permite remover contas de usuário
function deleteUserAccount() {
  var confirmation = confirm('Realmente deseja excluir a sua conta?')
  if (confirmation) {
    showItem(loading)
    firebase.auth().currentUser.delete().then(function () {
      alert('Conta foi excluída com sucesso')
    }).catch(function(error) {
      showError('Falha ao excluir a conta: ', error)
    }).finally(function () {
      hideItem(loading)
    })
  }
}
export function getToken() {
  // return window.sessionStorage.getItem("token");
  return window.localStorage.getItem("token");
}

export function setToken(token) {
  window.localStorage.setItem("token", token);
}

export function removeToken() {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem("token");
    resolve();
  });
}

export function setAccountInfo(data) {
  window.localStorage.setItem(
    "accountInfo",
    JSON.stringify(data)
  );
}

export function getAccountInfo() {
  return JSON.parse(window.localStorage.getItem("accountInfo"));
}

export function setPassword(pass){
  window.localStorage.setItem(
    'password',
    btoa(pass)
  )
}
export function getPassword(){
  return atob(window.localStorage.getItem('password'))
}
export function removePassword(){
  return new Promise((resolve,reject) =>{
    window.localStorage.removeItem('password');
    resolve()
  })
}
export function setRemember(remember){
  window.localStorage.setItem('remember',remember)
}
export function getRemember(){
  window.localStorage.getItem('remember')
}
import axios from axios;

const url = '/api'

export function addEmailSignUp(email) {
    axios.post(url+'/email-signup', {email}).then(res => console.log("Email added")).catch(err => console.log(err))
}

export function addContactRequest(contact) {
    axios.post(url+'/contact', {...contact}).then(res => console.log("Contact request added")).catch(err => console.log(err))
}
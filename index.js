const withSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const withoutSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function getCharacterSet() {
    return document.getElementById("include-symbols").checked ? withSymbols : withoutSymbols;
}

function getPasswordLength() {
    return parseInt(document.getElementById("password-length").value) || 12;
}

function generatePassword() {
    const characters = getCharacterSet();
    const length = getPasswordLength();
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function displayPasswords() {
    let password1 = generatePassword();
    let password2 = generatePassword();
    
    // Ensure the two passwords are different
    while (password1 === password2) {
        password2 = generatePassword();
    }
    
    document.getElementById("password-display-1").textContent = password1;
    document.getElementById("password-display-2").textContent = password2;
    
    // Reset copy button states
    document.getElementById("btn-copy-1").classList.remove("copied");
    document.getElementById("btn-copy-2").classList.remove("copied");
    document.getElementById("btn-copy-1").textContent = "Copy";
    document.getElementById("btn-copy-2").textContent = "Copy";
}

function resetPasswords() {
    document.getElementById("password-display-1").textContent = "";
    document.getElementById("password-display-2").textContent = "";
    document.getElementById("btn-copy-1").classList.remove("copied");
    document.getElementById("btn-copy-2").classList.remove("copied");
    document.getElementById("btn-copy-1").textContent = "Copy";
    document.getElementById("btn-copy-2").textContent = "Copy";
}

function copyToClipboard(displayId, buttonId) {
    const passwordText = document.getElementById(displayId).textContent;
    if (!passwordText) return;
    
    navigator.clipboard.writeText(passwordText).then(() => {
        const button = document.getElementById(buttonId);
        button.textContent = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
            button.textContent = "Copy";
            button.classList.remove("copied");
        }, 2000);
    });
}

document.getElementById("btn-generate").addEventListener("click", displayPasswords);
document.getElementById("btn-reset").addEventListener("click", resetPasswords);
document.getElementById("btn-copy-1").addEventListener("click", () => copyToClipboard("password-display-1", "btn-copy-1"));
document.getElementById("btn-copy-2").addEventListener("click", () => copyToClipboard("password-display-2", "btn-copy-2"));

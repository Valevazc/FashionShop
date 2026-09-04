let admin = {
    usuario: "admin",
    password: "admin"
};

function intentarLogin(){
    let usuarioIngresado = document.getElementById("usuario").value;
    let passwordIngresada = document.getElementById("password").value;

    if(usuarioIngresado === admin.usuario && passwordIngresada === admin.password){
        window.location.href = "gestionAdmin.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

document.getElementById("login").addEventListener("click", intentarLogin);

document.getElementById("password").addEventListener("keydown", function(evento){
    if(evento.key === "Enter"){
        intentarLogin();
    }
});


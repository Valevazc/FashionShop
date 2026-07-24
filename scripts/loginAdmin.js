
let admin= {

usuario:"admin",
password:"admin"

};



document.getElementById("login").addEventListener("click", function(e){

	let usuarioIngresado=document.getElementById("usuario").value;
	let passwordIngresada=document.getElementById("password").value


	if(usuarioIngresado === admin.usuario && passwordIngresada === admin.password){
		window.location.href="gestionAdmin.html"
	}else{
		alert("usuario o contrasena incorrectos");
	}
	
});



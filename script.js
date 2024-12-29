document.getElementById('btn').addEventListener('click', function() {
    window.location.href = 'menu.html';
});

// Inicializa Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBmb59pzNCTbywf8x_dm01EXhw0azIf7Yw",
   
    
    projectId: "moviemaniaprime-default-rtdb.firebaseio.com",
    storageBucket: "moviemaniaprime.appspot.com",
  
    appId: "1:550055949557:web:168594589de1bc723f41bc"
};

// Inicializa tu app Firebase
firebase.initializeApp(firebaseConfig);

// Función de verificación para el email y contraseña
function verificarUsuario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userRef = firebase.database().ref('User/' + email);

    userRef.once('value').then(snapshot => {
        if (snapshot.exists()) {
            const seguridad = snapshot.child('Seguridad').val();
            if (seguridad === password) {
                window.location.href = 'menu.html';
            } else {
                mostrarToast("Contraseña incorrecta");
            }
        } else {
            mostrarToast("Usuario no encontrado");
        }
    }).catch(error => {
        console.error("Error al leer la base de datos:", error);
    });
}

// Función para mostrar un toast
function mostrarToast(mensaje) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000); // Elimina el toast después de 3 segundos
}

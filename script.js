
// Inicializa Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBmb59pzNCTbywf8x_dm01EXhw0azIf7Yw",
    authDomain: "moviemaniaprime.firebaseapp.com",
    databaseURL: "https://moviemaniaprime-default-rtdb.firebaseio.com",
    projectId: "moviemaniaprime",
    storageBucket: "moviemaniaprime.appspot.com",
    messagingSenderId: "550055949557",
    appId: "1:550055949557:android:168594589de1bc723f41bc"
};

// Inicializa tu app Firebase
firebase.initializeApp(firebaseConfig);

// Función de verificación para el email y contraseña
function verificarUsuario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userRef = firebase.database().ref('User/' + email);

    userRef.once('value').then(snapshot => {
        if (!snapshot.exists()) {
            // Si el usuario no existe
            mostrarToast("User no encontrado");
        } else {
            // Verifica la contraseña
            const seguridad = snapshot.child('Segurit').val();
            if (seguridad !== password) {
                // Contraseña incorrecta
                mostrarToast("Contraseña Incorrecta");
            } else {
                // Credenciales correctas, redirigir
                window.location.href = 'menu.html';
            }
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

// Asumiendo que tienes un botón para iniciar sesión
document.getElementById("btn").onclick = verificarUsuario;

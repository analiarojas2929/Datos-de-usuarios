// IIFE para ejecutar la lógica al cargar la página
(async () => {
    // URL de la API de Random User para obtener 10 resultados
    const apiUrl = 'https://randomuser.me/api/?results=10';
    
    // Función para hacer la petición a la API y obtener datos
    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            const data = await response.json();
            return data.results; // Devolver los resultados de la API
        } catch (error) {
            console.error('Error:', error);
            return []; // En caso de error, devolver un array vacío
        }
    };

    // Llamar a la función para obtener los datos
    const users = await fetchUsers();

    // Seleccionar el contenedor donde se mostrarán los datos
    const userContainer = document.getElementById('user-data');

    // Verificar si el contenedor existe
    if (!userContainer) {
        console.error('El contenedor de usuarios no existe en el DOM');
        return;
    }

    // Mostrar los datos en el contenedor como párrafos
    users.forEach(user => {
        // Crear contenedor para cada usuario
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        // Crear imagen del usuario
        const userImage = document.createElement('img');
        userImage.src = user.picture.large; // Usar la URL de la imagen grande del usuario
        userImage.alt = `${user.name.first} ${user.name.last}`;

        // Crear párrafo con el nombre y correo del usuario
        const userInfo = document.createElement('p');
        userInfo.textContent = `${user.name.first} ${user.name.last}\n${user.email}\n${user.phone}`;

        // Agregar imagen y datos al contenedor del usuario
        userDiv.appendChild(userImage);
        userDiv.appendChild(userInfo);

        // Agregar el contenedor del usuario al contenedor principal
        userContainer.appendChild(userDiv);
    });
})();

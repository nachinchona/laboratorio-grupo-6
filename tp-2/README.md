# Trabajo práctico 2: web estática

¡Entrá a SpotiFAI para descubrir las mejores playlists!

## Obtención de datos

Para mostrar las playlists que quieras, tenés que hacer una petición a la API de Spotify (es gratis). En la [página de Spotify para desarrolladores](https://developer.spotify.com/), podés crear una aplicación para poder utilizar la API. Vas a obtener dos ID's, la de cliente y la secreta. Ambas son necesarias para realizar la petición a la API.

Se utiliza [cURL](https://curl.se/) en la terminal para la petición (es probable que ya lo tengas instalado). Si tenés Windows y no funcionan los comandos mostrados, reemplaza **"curl"** por **"curl.exe"**.

En la terminal, con el siguiente comando (reemplazando los campos apropiados), podrás obtener un token que dura 1 hora para poder realizar peticiones a la API:


```bash
curl -X POST "https://accounts.spotify.com/api/token" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials&client_id=<tu_id_cliente>&client_secret=<tu_id_secreta>"
```

Con el siguiente comando (con la terminal en la carpeta "json"), podés obtener un archivo JSON con los datos necesarios para mostrarlos en la página (reemplazando el token, la ID de la playlist y el nombre del archivo resultante):

```bash
curl --location --request GET 'https://api.spotify.com/v1/playlists/<id_playlist>?fields=images(url),name,description,tracks(items(track(album(name,release_date,images,external_urls),artists(name,external_urls),name,popularity,explicit,external_urls,preview_url))' --header 'Authorization: Bearer <token>' -o "<nombre-archivo>.json"
```

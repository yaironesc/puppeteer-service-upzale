# Puppeteer Render Service

Microservicio Node.js para generar imágenes (JPEG / PNG / WEBP)
a partir de una URL usando Puppeteer (Headless Chrome).

## Endpoint

GET /render

### Parámetros:
- url (obligatorio)
- format: jpeg | png | webp
- width: ancho en px
- height: alto en px
- quality: calidad (jpeg/webp)
- wait: networkidle0 | networkidle2

## Ejemplo

/render?url=https://upzale.com/render.php?id=1&format=jpeg&width=1080&height=1920

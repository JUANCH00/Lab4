# Queries - Productos Tecnológicos

## Configuración Postman
- **Método**: POST
- **URL**: `http://localhost:4000/graphql`
- **Headers**: `Content-Type: application/json`
- **Body**: raw → JSON

## QUERIES (Consultas)

### 1. Obtener todos los productos

```json
{
  "query": "{ productos { id nombre descripcion precio stock categoria } }"
}
```
### 2. Obtener un producto específico por ID

```json
{
  "query": "{ producto(id: \"1\") { id nombre descripcion precio stock categoria } }"
}
```

### 3. Obtener productos por categoría

```json
{
  "query": "{ productosPorCategoria(categoria: \"Smartphones\") { id nombre precio stock } }"
}
```

### 4. Obtener todas las categorías

```json
{
  "query": "{ categorias { id nombre descripcion } }"
}
```

### 5. Obtener una categoría con sus productos

```json
{
  "query": "{ categoria(id: \"1\") { nombre descripcion productos { nombre precio stock } } }"
}
```

### 6. Obtener productos con filtro de categoría específica (Laptops)

```json
{
  "query": "{ productosPorCategoria(categoria: \"Laptops\") { id nombre descripcion precio stock } }"
}
```

### 7. Obtener productos de Audio

```json
{
  "query": "{ productosPorCategoria(categoria: \"Audio\") { nombre precio stock } }"
}
```

### 8. Query múltiple - Productos y Categorías

```json
{
  "query": "{ productos { nombre precio } categorias { nombre } }"
}
```

## MUTATIONS (Modificaciones)

### 9. Agregar un nuevo producto

```json
{
  "query": "mutation { agregarProducto(nombre: \"iPad Pro 13\", descripcion: \"Tablet profesional de Apple\", precio: 4999000, stock: 10, categoria: \"Tablets\") { id nombre precio stock categoria } }"
}
```

### 10. Actualizar stock de un producto

```json
{
  "query": "mutation { actualizarStock(id: \"1\", stock: 50) { id nombre stock } }"
}
```

### 11. Agregar una nueva categoría

```json
{
  "query": "mutation { agregarCategoria(nombre: \"Tablets\", descripcion: \"Tabletas y dispositivos 2 en 1\") { id nombre descripcion } }"
}
```
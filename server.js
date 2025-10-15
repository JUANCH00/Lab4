import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { createSchema } from 'graphql-yoga';

const data = {
    productos: [
        { id: '1', nombre: 'iPhone 15 Pro', descripcion: 'Smartphone premium de Apple', precio: 4299000, stock: 15, categoria: 'Smartphones' },
        { id: '2', nombre: 'Samsung Galaxy S24 Ultra', descripcion: 'Flagship de Samsung con S Pen', precio: 5199000, stock: 8, categoria: 'Smartphones' },
        { id: '3', nombre: 'MacBook Pro M3', descripcion: 'Laptop profesional con chip M3', precio: 8999000, stock: 5, categoria: 'Laptops' },
        { id: '4', nombre: 'Dell XPS 15', descripcion: 'Laptop de alto rendimiento', precio: 6499000, stock: 12, categoria: 'Laptops' },
        { id: '5', nombre: 'AirPods Pro 2', descripcion: 'Audífonos con cancelación de ruido', precio: 899000, stock: 25, categoria: 'Audio' },
        { id: '6', nombre: 'Sony WH-1000XM5', descripcion: 'Audífonos over-ear premium', precio: 1299000, stock: 10, categoria: 'Audio' }
    ],
    categorias: [
        { id: '1', nombre: 'Smartphones', descripcion: 'Teléfonos inteligentes de última generación' },
        { id: '2', nombre: 'Laptops', descripcion: 'Computadoras portátiles' },
        { id: '3', nombre: 'Audio', descripcion: 'Dispositivos de audio y accesorios' }
    ]
};

const schema = createSchema({
    typeDefs: `
    type Producto {
      id: ID!
      nombre: String!
      descripcion: String!
      precio: Float!
      stock: Int!
      categoria: String!
    }

    type Categoria {
      id: ID!
      nombre: String!
      descripcion: String!
      productos: [Producto]
    }

    type Query {
      productos: [Producto]
      producto(id: ID!): Producto
      productosPorCategoria(categoria: String!): [Producto]
      categorias: [Categoria]
      categoria(id: ID!): Categoria
    }

    type Mutation {
      agregarProducto(nombre: String!, descripcion: String!, precio: Float!, stock: Int!, categoria: String!): Producto
      actualizarStock(id: ID!, stock: Int!): Producto
      agregarCategoria(nombre: String!, descripcion: String!): Categoria
    }
  `,
    resolvers: {
        Query: {
            productos: () => data.productos,
            producto: (_, { id }) => data.productos.find(p => p.id === id),
            productosPorCategoria: (_, { categoria }) => data.productos.filter(p => p.categoria === categoria),
            categorias: () => data.categorias,
            categoria: (_, { id }) => data.categorias.find(c => c.id === id)
        },
        Mutation: {
            agregarProducto: (_, { nombre, descripcion, precio, stock, categoria }) => {
                const nuevoProducto = {
                    id: String(data.productos.length + 1),
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    categoria
                };
                data.productos.push(nuevoProducto);
                return nuevoProducto;
            },
            actualizarStock: (_, { id, stock }) => {
                const producto = data.productos.find(p => p.id === id);
                if (producto) {
                    producto.stock = stock;
                }
                return producto;
            },
            agregarCategoria: (_, { nombre, descripcion }) => {
                const nuevaCategoria = {
                    id: String(data.categorias.length + 1),
                    nombre,
                    descripcion
                };
                data.categorias.push(nuevaCategoria);
                return nuevaCategoria;
            }
        },
        Categoria: {
            productos: (categoria) => data.productos.filter(p => p.categoria === categoria.nombre)
        }
    }
});

const yoga = createYoga({ schema });
const server = createServer(yoga);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`);
});
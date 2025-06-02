import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Grid,
  Paper
} from '@mui/material';
import axios from 'axios';

const ProductForm = ({ product, onSubmit, onCancel, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        // Update existing product
        await axios.put(`/api/products/${product.id}`, formData);
      } else {
        // Create new product
        await axios.post('/api/products', formData);
      }
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        category: ''
      });
      if (onProductAdded) onProductAdded();
      alert('Producto guardado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el producto');
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marca"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Categoría"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button type="button" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {product ? 'Actualizar' : 'Crear'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ProductForm;

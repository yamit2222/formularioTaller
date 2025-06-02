import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Grid,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material';
import { useEditProduct } from '../hooks/products/useEditProduct';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const { editProduct, isLoading: isEditLoading } = useEditProduct();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const createProduct = async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/products', productData);
      Swal.fire({
        icon: 'success',
        title: '¡Producto creado!',
        text: 'El producto se ha creado correctamente',
        timer: 1500,
        showConfirmButton: false
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el producto');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error al crear el producto'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await editProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marca"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
              <Button 
                variant="outlined" 
                onClick={onCancel}
                disabled={isLoading || isEditLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isLoading || isEditLoading}
              >
                {isLoading || isEditLoading ? (
                  <CircularProgress size={24} />
                ) : product ? 'Actualizar' : 'Crear'}
              </Button>
            </Box>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;

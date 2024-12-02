import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import GerarGraficos from './GerarGraficos';

function RegistroDeGastos() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [gastos, setGastos] = useState([]);
  const [error, setError] = useState('');

  const adicionarGasto = () => {
    setError('');
    if (!descricao || !valor || isNaN(valor) || parseFloat(valor) <= 0) {
      setError('Por favor, insira uma descrição válida e um valor maior que zero.');
      return;
    }

    const novoGasto = {
      descricao,
      valor: parseFloat(valor),
    };

    setGastos([...gastos, novoGasto]);
    setDescricao('');
    setValor('');
  };

  // Atualiza os valores da tabela diretamente
  const handleEdit = (index, field, value) => {
    const novosGastos = [...gastos];
    novosGastos[index][field] = field === 'valor' ? parseFloat(value) || 0 : value;
    setGastos(novosGastos);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Registro de Gastos Mensais
      </Typography>

      <TextField
        label="Descrição da Despesa"
        variant="outlined"
        fullWidth
        margin="normal"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        helperText="Exemplo: Alimentação, Transporte"
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        label="Valor da Despesa"
        variant="outlined"
        fullWidth
        margin="normal"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        helperText="Exemplo: 100, 50.5"
        sx={{ backgroundColor: 'white' }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={adicionarGasto}
        sx={{ mt: 2 }}
      >
        Adicionar Gasto
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {gastos.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Despesas Registradas:
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="tabela de gastos">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Descrição</strong></TableCell>
                    <TableCell align="right"><strong>Valor (R$)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gastos.map((gasto, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          variant="standard"
                          value={gasto.descricao}
                          onChange={(e) => handleEdit(index, 'descricao', e.target.value)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          variant="standard"
                          value={gasto.valor}
                          type="number"
                          onChange={(e) => handleEdit(index, 'valor', e.target.value)}
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Component de gráficos */}
          <GerarGraficos gastos={gastos} />
        </>
      )}
    </Box>
  );
}

export default RegistroDeGastos;

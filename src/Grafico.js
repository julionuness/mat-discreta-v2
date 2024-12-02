import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Container, TextField, Button, Typography, Alert } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes necessários para o Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Grafico = () => {
  const [xValues, setXValues] = useState(''); 
  const [functionStr, setFunctionStr] = useState('x*x'); 
  const [graphData, setGraphData] = useState(null); 
  const [error, setError] = useState(''); 


  const generateData = (xArr, func) => {
    try {
      return xArr.map(x => {
        return eval(func.replace(/x/g, x)); // Substitui x na função 
      });
    } catch (err) {
      setError('Erro ao calcular a função. Verifique a sintaxe.');
      return [];
    }
  };

  const handleSubmit = () => {
    setError('');
    
    // Converçãp do x para um array 
    const xArr = xValues.split(',').map(val => parseFloat(val.trim()));

    if (xArr.some(isNaN)) {
      setError('Por favor, insira apenas números válidos para X.');
      return;
    }

    // Gera y apartir dos valores do x
    const yArr = generateData(xArr, functionStr);

    // Gera o gráfico com os dados fornecidos
    setGraphData({
      labels: xArr, 
      datasets: [
        {
          label: `y = ${functionStr}`,
          data: yArr, 
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    });
  };

  return (
    <Container>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Gráficos Matemáticos
        </Typography>

        <TextField
          label="Insira os valores de X (ex: 10,20,30)"
          variant="outlined"
          fullWidth
          value={xValues}
          onChange={(e) => setXValues(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: 'white' }}
        />

        <TextField
          label="Insira a função matemática (ex: x*x, x*2)"
          variant="outlined"
          fullWidth
          value={functionStr}
          onChange={(e) => setFunctionStr(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: 'white' }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Plotar Gráfico
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {graphData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom align="center">
              Gráfico de Função y = {functionStr}
            </Typography>
            <Line data={graphData} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Grafico;

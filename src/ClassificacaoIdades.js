import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, Alert } from '@mui/material';

function ClassificacaoIdades() {
  const [idades, setIdades] = useState('');
  const [intervalos, setIntervalos] = useState('');
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');

  const agruparIdades = () => {
    setError('');
    const listaIdades = idades.split(',').map((idade) => parseInt(idade.trim(), 10));
    const listaIntervalos = intervalos.split(',').map((intervalo) => intervalo.trim());

    if (listaIdades.some((idade) => isNaN(idade)) || listaIntervalos.some((intervalo) => !intervalo.includes('-'))) {
      setError('Por favor, insira valores válidos para idades e intervalos.');
      return;
    }

    const grupos = listaIntervalos.map((intervalo) => {
      const [min, max] = intervalo.split('-').map((num) => parseInt(num.trim(), 10));
      const grupo = listaIdades.filter((idade) => (idade >= min && (max ? idade <= max : true)));
      return { intervalo, count: grupo.length };
    });

    setResultado(grupos);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Classificação de Idades por Intervalos
      </Typography>

      <TextField
        label="Insira as Idades (separadas por vírgula)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={idades}
        onChange={(e) => setIdades(e.target.value)}
        helperText="Exemplo: 12, 25, 40"
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        label="Defina os Intervalos (ex: 0-18, 19-35)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={intervalos}
        onChange={(e) => setIntervalos(e.target.value)}
        helperText="Exemplo: 0-18, 19-35"
        sx={{ backgroundColor: 'white' }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={agruparIdades}
        sx={{ mt: 2 }}
      >
        Agrupar Idades
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {resultado.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Resultados:
          </Typography>
          {resultado.map((grupo, index) => (
            <Card key={index} sx={{ mb: 2, backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="body1" align="center">
                  <strong>Intervalo:</strong> {grupo.intervalo} | <strong>Contagem:</strong> {grupo.count}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ClassificacaoIdades;

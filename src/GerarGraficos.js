import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GerarGraficos({ gastos }) {
  if (gastos.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Não há dados para gerar gráficos.
      </Typography>
    );
  }

  const labels = gastos.map((gasto) => gasto.descricao);
  const valores = gastos.map((gasto) => gasto.valor);

  // Preparando os dados para o gráfico de área
  const dadosArea = labels.map((label, index) => ({
    descricao: label,
    valor: valores[index],
  }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom align="center">
        Gráficos dos Gastos
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        
        {/* Gráfico de Barras */}
        <Box>
          <Typography variant="subtitle1" align="center">
            Gráfico de Barras
          </Typography>
          <BarChart
            series={[{ data: valores }]}
            xAxis={[{ data: labels, scaleType: 'band' }]}
            width={400}
            height={300}
          />
        </Box>

        {/* Gráfico de Pizza */}
        <Box>
          <Typography variant="subtitle1" align="center">
            Gráfico de Pizza
          </Typography>
          <PieChart
            series={[{
              innerRadius: 0,
              data: labels.map((label, index) => ({ id: label, value: valores[index] })),
            }]}
            width={400}
            height={300}
          />
        </Box>

        {/* Gráfico de Área */}
        <Box>
          <Typography variant="subtitle1" align="center">
            Gráfico de Área
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dadosArea}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="descricao" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

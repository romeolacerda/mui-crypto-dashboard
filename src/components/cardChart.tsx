import { Box } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { PriceData } from "../interfaces/PriceData";
import { formatPrice } from "../utils/formatPrice";

export const CardChart = ({ data, color }: { data: PriceData[] | undefined; color: string }) => {
  if (!data || data.length === 0) return null;

  return (
    <Box sx={{ width: '100%', height: 60 }}>
      <ResponsiveContainer width="100%" height={60}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-mini-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" hide />

          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px'
            }}
            formatter={(value: number) => [formatPrice(value), 'Preço']}
            labelFormatter={(label: string) => `Data: ${label}`}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-mini-${color})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
import { Box, CircularProgress, Typography } from "@mui/material"

export const Loading = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#fafafa"
        >
            <Box textAlign="center">
                <CircularProgress size={60} />
                <Typography variant="h6" mt={2} color="text.secondary">
                    Carregando...
                </Typography>
            </Box>
        </Box>
    )
}
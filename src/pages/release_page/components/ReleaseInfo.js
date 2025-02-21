import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const ReleaseInfo = ({release, loading}) => {
    return (
        
            <Box className="box-container">
                <Typography
                    sx={{
                        textAlign: 'left', // Alineación del texto
                        fontFamily: 'InterBold', // Familia de la fuente
                        fontSize: 19, // Tamaño de la fuente
                    }}
                >
                    {release?.title}
                </Typography>
                <img 
                    src={release?.thumb} 
                    alt={release?.title} 
                    style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '3px'
                    }}
                />
                
            </Box>
    );
};

export default ReleaseInfo;
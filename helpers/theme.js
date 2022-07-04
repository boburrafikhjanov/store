import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
   palette: {
      primary: {
         // main: '#FED000',
         main: '#E62301',
      },
      secondary: {
         main: '#E62301',
      },
      error: {
         main: red.A400,
      },
      background: {
         default: '#fff',
      },
   },
});

export default theme;
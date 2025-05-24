import AppRouter from './src/AppRouter';
import {ThemeProvider} from './src/utils/theme/ThemeContext';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

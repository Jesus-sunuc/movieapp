import Router from './Router';
import {ThemeProvider} from './src/utils/theme/ThemeContext';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
// import { ChatPage } from './pages/ChatPage';
import Routes from './routes';
// import {Routes} from './router/Routes';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;

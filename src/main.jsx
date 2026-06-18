import { render } from 'preact';
import './styles/global.css';
import { Button } from './components/Button';
import { Card } from './components/Card/Card';
import { Input } from './components/Input';
import { Dropdown } from './components/Dropdown/Dropdown';

export function App() {
  return (
    <div data-theme="brand-a">
      <Button />
      <Card/>
      <Input/>
      <Dropdown />
    </div>
  );
}

render(<App />, document.getElementById('app'));
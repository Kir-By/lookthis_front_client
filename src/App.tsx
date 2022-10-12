import React, {FC} from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './common/components/layout/Layout';
import Login from './pages/login';

const App: FC = () => {
  console.log('test2');

  return (
    <>
      <div className="App">
        <Layout>
          <Login />
        </Layout>
      </div>
    </>
  );
};

export default App;

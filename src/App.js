import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, Selector, Highlight } from './components';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/selector" element={<Selector />} />
        <Route path="/" element={<Highlight />}>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

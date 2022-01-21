import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.less';

// import Index from '@/pages';
// import Home from '@/pages/home';
// import About from '@/pages/about';
// import Invoices from '@/pages/invoice';
// import Invoice from '@/pages/invoice/invoice';
// import SentInvoices from '@/pages/invoice/sent';

// import Login from '@/pages/login';

import MyRouter from '@/router';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Index />} />
    //     <Route path="/home" element={<Home />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/invoices">
    //       <Route index element={<Invoices />} />
    //       <Route path=":invoiceId" element={<Invoice />} />
    //       <Route path="sent" element={<SentInvoices />} />
    //     </Route>

    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
    <MyRouter />
  );
}

export default App;

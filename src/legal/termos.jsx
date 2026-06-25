import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LegalLayout from './LegalLayout';
import TermosContent from './TermosContent';
import '../index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalLayout title="Termos de Uso">
      <TermosContent />
    </LegalLayout>
  </StrictMode>
);

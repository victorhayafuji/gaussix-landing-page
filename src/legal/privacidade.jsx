import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LegalLayout from './LegalLayout';
import PrivacidadeContent from './PrivacidadeContent';
import '../index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalLayout title="Política de Privacidade">
      <PrivacidadeContent />
    </LegalLayout>
  </StrictMode>
);

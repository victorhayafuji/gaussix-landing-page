const EMAIL = 'contato@gaussix.com';

export default function PrivacidadeContent() {
  return (
    <>
      <p className="legal-updated">Última atualização: junho de 2026 · Versão 2026-06</p>

      <p>
        Esta Política de Privacidade descreve como a <strong>Gaussix</strong> trata dados pessoais
        no seu site (<a href="/">gaussix.com</a>) e na prestação de seus serviços — engenharia de
        dados &amp; BI, automações inteligentes, agentes de IA, landing pages e sistemas/SaaS sob
        medida —, incluindo o produto <strong>FlowIA</strong>. O tratamento segue a Lei Geral de
        Proteção de Dados (LGPD — Lei nº 13.709/2018).
      </p>

      <h2>1. Quem somos e nossos papéis</h2>
      <p>
        A Gaussix atua em dois papéis distintos, conforme o contexto:
      </p>
      <ul>
        <li>
          <strong>Controladora</strong> — em relação aos dados de visitantes do site e de pessoas
          que entram em contato conosco (ex.: por e-mail), quando decidimos as finalidades do
          tratamento.
        </li>
        <li>
          <strong>Operadora</strong> — quando processamos dados em nome de um cliente contratante.
          No <strong>FlowIA</strong>, por exemplo, cada estabelecimento cliente é o
          <strong> controlador</strong> dos dados de seus próprios clientes finais, e a Gaussix
          processa esses dados conforme as instruções contratuais do cliente.
        </li>
      </ul>

      <h2>2. Dados que tratamos</h2>
      <table>
        <thead>
          <tr><th>Categoria</th><th>Exemplos</th><th>Origem</th></tr>
        </thead>
        <tbody>
          <tr><td>Contato</td><td>Nome, e-mail, mensagem</td><td>E-mail enviado para nós</td></tr>
          <tr><td>Navegação</td><td>Endereço IP, dados técnicos da requisição</td><td>Acesso ao site / CDN</td></tr>
          <tr><td>Cliente (produtos)</td><td>Identificação, agendamento, conversas, telemetria de uso</td><td>Operação do produto contratado (ex.: FlowIA)</td></tr>
        </tbody>
      </table>
      <p>
        O site institucional <strong>não usa cookies de rastreamento nem ferramentas de analytics
        de terceiros</strong>. As fontes tipográficas são carregadas via Google Fonts, o que pode
        expor o endereço IP do visitante ao provedor no momento do carregamento.
      </p>

      <h2>3. Finalidades e bases legais (LGPD, Art. 7º e 11)</h2>
      <table>
        <thead><tr><th>Finalidade</th><th>Base legal</th></tr></thead>
        <tbody>
          <tr><td>Responder contatos e propostas comerciais</td><td>Execução de contrato / procedimentos preliminares e legítimo interesse</td></tr>
          <tr><td>Operar e melhorar o site (segurança, logs)</td><td>Legítimo interesse</td></tr>
          <tr><td>Prestar os serviços contratados (ex.: FlowIA)</td><td>Execução de contrato</td></tr>
          <tr><td>Cumprir obrigações legais/regulatórias</td><td>Obrigação legal</td></tr>
        </tbody>
      </table>

      <h2>4. Compartilhamento e subprocessadores</h2>
      <p>
        Não vendemos dados pessoais. Para prestar os serviços, podemos utilizar provedores de
        infraestrutura e tecnologia que atuam como subprocessadores, por exemplo:
      </p>
      <ul>
        <li><strong>Netlify</strong> — hospedagem do site estático e CDN</li>
        <li><strong>Render</strong> — hospedagem de API e dashboards de produtos</li>
        <li><strong>Supabase</strong> — banco de dados e armazenamento</li>
        <li><strong>OpenAI</strong> — processamento de linguagem natural e IA</li>
        <li><strong>Meta (WhatsApp Cloud API)</strong> — mensageria, quando aplicável ao produto</li>
        <li><strong>Google Fonts</strong> — entrega de fontes tipográficas</li>
      </ul>

      <h2>5. Transferência internacional</h2>
      <p>
        Alguns provedores acima processam dados fora do Brasil. Nesses casos, a transferência se
        apoia nas hipóteses e garantias previstas na LGPD e nos contratos firmados com cada
        provedor.
      </p>

      <h2>6. Retenção</h2>
      <p>
        Mantemos os dados apenas pelo tempo necessário às finalidades acima ou conforme exigido por
        lei. Em produtos como o FlowIA, prazos técnicos típicos incluem deduplicação de mensagens
        (7 dias), histórico de conversa (90 dias) e métricas operacionais (365 dias), além dos
        prazos definidos no contrato do cliente. Mensagens de contato comercial são mantidas
        enquanto necessário ao relacionamento.
      </p>

      <h2>7. Direitos do titular (LGPD, Art. 18)</h2>
      <p>O titular pode solicitar a qualquer momento:</p>
      <ul>
        <li>Confirmação da existência de tratamento e acesso aos dados</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
        <li>Portabilidade e informação sobre compartilhamento</li>
        <li>Revogação do consentimento, quando aplicável</li>
      </ul>
      <p>
        Quando a Gaussix atua como <strong>operadora</strong> (ex.: dados de clientes finais dentro
        do FlowIA), as solicitações devem ser direcionadas ao <strong>controlador</strong> (o
        estabelecimento contratante); a Gaussix dá suporte conforme o contrato.
      </p>

      <h2>8. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais como isolamento de dados por cliente,
        autenticação, criptografia em trânsito, mascaramento de dados sensíveis em logs, limites de
        requisição e cabeçalhos de segurança HTTP.
      </p>

      <h2>9. Alterações desta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente. A data de “Última atualização” no topo
        indica a versão vigente.
      </p>

      <h2>10. Contato</h2>
      <p>
        Dúvidas ou solicitações sobre privacidade e proteção de dados:{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </>
  );
}

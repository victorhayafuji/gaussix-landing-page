const EMAIL = 'contato@gaussix.com';

export default function TermosContent() {
  return (
    <>
      <p className="legal-updated">Última atualização: junho de 2026 · Versão 2026-06</p>

      <p>
        Estes Termos de Uso regem o acesso ao site da <strong>Gaussix</strong>
        (<a href="/">gaussix.com</a>) e a contratação de seus serviços e produtos — engenharia de
        dados &amp; BI, automações, agentes de IA, landing pages e sistemas/SaaS sob medida,
        incluindo o produto <strong>FlowIA</strong>. Ao utilizar o site ou contratar a Gaussix, você
        concorda com estes termos.
      </p>

      <h2>1. Objeto</h2>
      <p>
        O site apresenta as soluções da Gaussix e canais de contato. Os serviços e produtos
        específicos são regidos também pela proposta/contrato comercial firmado em cada caso, que
        prevalece sobre estes termos em caso de divergência.
      </p>

      <h2>2. Uso do site</h2>
      <ul>
        <li>O conteúdo é informativo e pode ser ajustado a qualquer momento.</li>
        <li>É vedado tentar comprometer a segurança, a disponibilidade ou a integridade do site.</li>
      </ul>

      <h2>3. Papéis na proteção de dados (LGPD)</h2>
      <p>
        Nos produtos operados pela Gaussix em nome de clientes — como o <strong>FlowIA</strong> —, o
        <strong> cliente contratante</strong> é o controlador dos dados de seus clientes finais e a
        <strong> Gaussix</strong> atua como operadora, processando dados conforme as instruções do
        contratante e a <a href="/privacidade">Política de Privacidade</a>. O contratante é
        responsável por informar seus clientes e obter as bases legais aplicáveis.
      </p>

      <h2>4. Uso permitido e proibido</h2>
      <p><strong>Permitido:</strong> usar os serviços para fins legítimos do negócio do cliente, em conformidade com a legislação brasileira, incluindo a LGPD.</p>
      <p><strong>Proibido:</strong></p>
      <ul>
        <li>Coletar ou tratar dados sem finalidade legítima e base legal.</li>
        <li>Compartilhar credenciais de acesso ou tentar acessar dados de outros clientes.</li>
        <li>Usar os serviços para spam, fraude, conteúdo ilícito ou violação de direitos de terceiros.</li>
      </ul>

      <h2>5. Serviços, IA e disponibilidade</h2>
      <p>
        Soluções de IA (ex.: assistentes do FlowIA) utilizam modelos de terceiros e podem produzir
        respostas imprecisas; ações críticas dependem de validação por ferramentas próprias do
        produto. A Gaussix empenha-se em manter alta disponibilidade, mas não garante operação
        ininterrupta, pois há dependência de provedores externos (ex.: provedores de nuvem, IA e
        mensageria).
      </p>

      <h2>6. Propriedade intelectual</h2>
      <p>
        O código, a marca e a documentação da Gaussix e de seus produtos (incluindo o FlowIA)
        pertencem à Gaussix. Os dados e conteúdos inseridos pelo cliente permanecem de propriedade
        do cliente.
      </p>

      <h2>7. Limitação de responsabilidade</h2>
      <p>
        Na máxima extensão permitida em lei, a Gaussix não responde por danos indiretos, lucros
        cessantes ou por decisões tomadas exclusivamente com base em respostas automatizadas, sem
        validação humana.
      </p>

      <h2>8. Vigência e rescisão</h2>
      <p>
        A contratação dos serviços segue o prazo e as condições do contrato comercial. Na rescisão,
        o cliente pode solicitar a exportação de seus dados; a eliminação/anonimização ocorre
        conforme o contrato e a <a href="/privacidade">Política de Privacidade</a>.
      </p>

      <h2>9. Lei aplicável e foro</h2>
      <p>
        Estes termos são regidos pela legislação brasileira. Fica eleito o foro do domicílio da
        Gaussix, salvo disposição diversa no contrato comercial.
      </p>

      <h2>10. Contato</h2>
      <p>
        Dúvidas sobre estes termos: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </>
  );
}

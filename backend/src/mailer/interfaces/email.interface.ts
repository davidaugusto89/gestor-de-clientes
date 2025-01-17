export interface EmailOptions {
  to: string | string[]; // Destinatário ou uma lista de destinatários
  from?: string; // Remetente (opcional, pode usar o padrão configurado)
  subject: string; // Assunto do e-mail
  text?: string; // Corpo do e-mail em texto simples
  html?: string; // Corpo do e-mail em HTML
  cc?: string | string[]; // Destinatários em cópia (opcional)
  bcc?: string | string[]; // Destinatários em cópia oculta (opcional)
  attachments?: EmailAttachment[]; // Lista de anexos (opcional)
}

export interface EmailAttachment {
  filename: string; // Nome do arquivo
  content?: string | Buffer; // Conteúdo do anexo
  path?: string; // Caminho para o arquivo
  contentType?: string; // Tipo de conteúdo MIME (opcional)
  encoding?: string; // Codificação do arquivo (opcional)
}

export interface EmailService {
  sendEmail(options: EmailOptions): Promise<void>; // Contrato para o método de envio
}

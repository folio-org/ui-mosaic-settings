export interface OrderTemplate {
  id?: string;
  templateName: string;
  templateCode?: string;
  templateDescription?: string;
}

export interface MosaicConfiguration {
  id?: string;
  defaultTemplateId: string;
  metadata: ACQ.Metadata;
}

export interface IOptions {
  googleKey?: string;
  dev?: boolean;
  permitedDomains?: string[];
}

export interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

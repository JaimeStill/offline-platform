import { ContentService } from './content.service';
import { MarkedService } from './marked.service';
import { RoutingService } from './routing.service';

export const Services = [
  ContentService,
  MarkedService,
  RoutingService
];

export * from './content.service';
export * from './marked.service';
export * from './routing.service';

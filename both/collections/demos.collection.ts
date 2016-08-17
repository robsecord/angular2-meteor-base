import { Mongo } from 'meteor/mongo';
import { Demo } from '../interfaces/demo.interface';

export const Demos = new Mongo.Collection<Demo>('demos');

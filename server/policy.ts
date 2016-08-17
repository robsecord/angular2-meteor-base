// Angular/Meteor Components
import { BrowserPolicy } from 'meteor/browser-policy';


BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();

BrowserPolicy.content.allowEval(); // for now, this is breaking something in meteor...

BrowserPolicy.content.allowInlineStyles();

BrowserPolicy.content.allowOriginForAll("https://*.google-analytics.com");
BrowserPolicy.content.allowOriginForAll("https://*.googleapis.com");
BrowserPolicy.content.allowOriginForAll("https://*.gstatic.com");
BrowserPolicy.content.allowOriginForAll("https://*.bootstrapcdn.com");
BrowserPolicy.content.allowOriginForAll("https://*.maxcdn.com");

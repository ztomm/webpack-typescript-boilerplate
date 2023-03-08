/**
 * Module dependencies.
 * ----------------------------------------------------------
 */

import config from 'config';
import path from 'path';

import express, { Express, Request, Response, NextFunction, Router } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';

import session, {CookieOptions} from 'express-session';
import createMemoryStore from 'memorystore';

import crypto from 'crypto';
import helmet from 'helmet';

import router from './app-router.js';

const isProd: boolean = process.env.NODE_ENV === 'production';


/**
 * Express configuration.
 * ----------------------------------------------------------
 */

const app: Express = express();

app.set('trust proxy', 1);
app.set('host', config.get('host') || '0.0.0.0');
app.set('port', config.get('port') || 8080);
app.set('protocol', 'http');
app.disable('x-powered-by');

// Logging to console while dev or to files while prod
if (!isProd)
	app.use(morgan('dev'));
// else
	// any production logger

// Views engine pug
app.set('views', path.join(process.cwd(), 'server/views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session 
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.get('session.secret'),
	name: config.get('session.name'),
	cookie: <CookieOptions> {
		httpOnly: true,
		secure: isProd ? true : 'auto',
		sameSite: 'strict',
		maxAge: config.get('session.maxAge'),
	},
	store: new (createMemoryStore(session))({
		checkPeriod: config.get('session.maxAge')
	}),
}));


/**
 * Headers
 * ----------------------------------------------------------
 */

app.use((req: Request, res: Response, next: NextFunction) => {

	req.headers.nonce = crypto.randomBytes(16).toString('hex');

	if (process.env.NODE_ENV === 'production') {
		app.use(helmet({
			hsts: true,
			contentSecurityPolicy: {
				directives: {
					"default-src": ["'self'"],
					"script-src": ["'self'", `"nonce-${req.headers.nonce}"`],
					"style-src": ["'self'", `"nonce-${req.headers.nonce}"`],
					"img-src": ["'self'", `data:`],
					"connect-src": ["'self'", "ws:", `'nonce-${req.headers.nonce}'`],
					"object-src": ["'none'"],
				},
			},
		}));
	}

	next();
});


/**
 * Routes
 * ----------------------------------------------------------
 */

app.use(router);


/**
 * Start Express server.
 * ----------------------------------------------------------
 */

app.listen(app.get('port'), () => {
	console.log('-----------------------------------------------');
	console.log('');
	console.log('App is running at http://localhost:%d in %s mode', app.get('port'), process.env.NODE_ENV);
	console.log('Press CTRL-C to stop');
	console.log('');
	console.log('-----------------------------------------------');
});

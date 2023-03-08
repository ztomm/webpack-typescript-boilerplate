import path  from 'path';
import express, { Router } from 'express';
import responsiveImages from 'express-responsive-images';


/**
 * Controllers (route handlers).
 * ----------------------------------------------------------
 */

import PageHomeController    from './controllers/page-home.js';
import PageAboutController   from './controllers/page-about.js';
import PageSecretController  from './controllers/page-secret.js';
import ErrorPagesController  from './controllers/error-pages.js';
import ApiController         from './controllers/api.js';

const homeController       = new PageHomeController();
const aboutController      = new PageAboutController();
const secretController     = new PageSecretController();
const errorPagesController = new ErrorPagesController();
const apiController        = new ApiController();

const router: Router = express.Router();


/**
 * Page routes.
 * ----------------------------------------------------------
 */

router.get('/', homeController.index);
router.get('/about', aboutController.index);
router.get('/secret', secretController.index);


/**
 * API routes.
 * ----------------------------------------------------------
 */

router.post('/api/data-example', apiController.postDataExample);


/**
 * Static routes.
 * ----------------------------------------------------------
 */

// https://www.npmjs.com/package/express-responsive-images
router.use(responsiveImages({
	staticDir: '/public',
	watchedDirectories: ['/images', '/media'],
	debug: false,
	// options ...
}));

// maxAge: 1d = 1 * 86400000
// maxAge: 1m = 30 * 86400000
// maxAge: 1y = 365.25 * 86400000
router.use('/dist', express.static(path.join(process.cwd(), '/client-build'), { maxAge: 30 * 86400000 }));
router.use('/', express.static(path.join(process.cwd(), '/public'), { maxAge: 30 * 86400000 }));

// avoid this route when not using jQuery inline or within /public/js/
router.use('/lib/jquery', express.static(path.join(process.cwd(), 'node_modules/jquery/dist'), { maxAge: 30 * 86400000 }));


/**
 * 404 - no route found
 * ----------------------------------------------------------
 */

router.use(errorPagesController.page404);
// router.use((req: Request, res: Response) => {
// 	errorPagesController.page404;
// });


export default router;
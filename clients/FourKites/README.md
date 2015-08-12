Fourkites.com Website
=======

Site running on Statamic. Update instructions located [here](https://github.com/rickysalsberry/fourkites/blob/master/README_Upgrade.md).

Servers:
---

:warning: These servers are outdated for FourKites, they are pertaining to Compo's setup.

#### Development Server
[http://fourdev.compo.us](http://fourdev.compo.us)

Lives on Bluehost. Requires SSH into server, navigation to `public_html/compo_us/dev/fourkites` folder. 
Branch default is `master`, but can be `any branch` that needs tested.


#### Staging Server
[http://fourstaging.compo.us](http://fourstaging.compo.us)

Lives on Bluehost. Requires SSH into server, navigation to `public_html/compo_us/staging/fourkites` folder. 
Branch should be `staging`.


#### Production Server
[http://fourkites.com](http://fourkites.com)

Lives on ??????. Requires SSH into server, navigation go `public_html/??????????` folder. 
Branch should be `production`.


Current Site Map:
---

    ├── 0.0 Home
    ├── 1.0 Products
    ├── 2.0 Shippers
    ├── 3.0 Brokers
    ├── 4.0 Carriers
    ├── 5.0 About FourKites
    ├── 6.0 Request a Demo
    ├── --- Terms of Use
    ├── --- Privacy Policy
    ├── --- 404 Error


Development Setup:
---

This build of Fourkites.com is built on [Statamic](http://statamic.com). It requires a build system (with gulpjs) to assemble the assets (js, css, images). Everything here assumes you have [nodejs](http://nodejs.org) and ruby installed on your system.

1. First you need to install PHP: [https://github.com/Homebrew/homebrew-php](https://github.com/Homebrew/homebrew-php)
2. Then `cd` into `project_name`
3. Run `npm install`
4. Run `gulp` – This will compile your project, start livereload and open a PHP server instance at `localhost:8000`
5. Visit [localhost:8000](http://localhost:8000)

#### Gulp Workflow:

Once all the required items are installed, you should just have to type `gulp` in the root of the project directory. Working JS, CSS, & image files live in `project_name/_theme/_assets/` and are compiled into `project_name/assets/`.

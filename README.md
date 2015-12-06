# [The Open Source Club's Website](https://opensource.osu.edu)

[![Build Status](https://travis-ci.org/OSUOSC/open-source-club-website.svg?branch=master)](https://travis-ci.org/OSUOSC/open-source-club-website)
[![Dependency Status](https://gemnasium.com/OSUOSC/open-source-club-website.svg)](https://gemnasium.com/OSUOSC/open-source-club-website)
[![security](https://hakiri.io/github/OSUOSC/open-source-club-website/master.svg)](https://hakiri.io/github/OSUOSC/open-source-club-website/master)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[staging site](https://osuosc.github.io/open-source-club-website/)

This is our repository for our club's [website](https://opensource.osu.edu). It's built with [Jekyll](https://github.com/jekyll/jekyll), [Jade](https://github.com/jadejs/jade), [Sass](https://github.com/sass/sass), [Coffeescript](https://github.com/jashkenas/coffeescript), and [Grunt](https://github.com/gruntjs/grunt).

### How can I contribute?

- report bugs, issues, and documentation inconsistencies
- request features
- hate or love a feature . . . *tell us*
- request topics for future meetings
- fork us, fix an issue and submit a merge request
- refactor suboptimal code

### How do I run the site locally?

Well first you need a few things:

##### ruby 2.2.3
> We suggest installing ruby via rvm (*ruby version manager*)

##### node.js 4.0.0
> We suggest installing node via nvm (*node version manager*)

```bash
# clone the repo
git clone https://github.com/OSUOSC/open-source-club-website.git

# change directory
cd open-source-club-website
```

```bash
# if this is your first time, execute the following script
bash init.sh
```
---

```bash
# fetch dependencies and generate site
grunt build
```
---

```bash
# generate a new post from template
grunt new
```
---

```bash
# run tests
grunt test
```
---

```bash
# equivalent to "grunt build" in addition to running a local server
grunt serve
```

Once generated (which takes ~1 minutes) the site will be accessible at `http://localhost:4040`


```bash
# compile site locally and automatically push to the relative gh-pages branch
rake deploy:ghpages
```

### Additional Information

##### Presenters
- meeting announcements must contain the following information
  - meeting time
  - building and room number
  - meeting topic
  - topic description

If you wish to provide a link to your presentation in your post (we suggest `.pdf`)
save your document with the *exact* same filename convention.

For example if I created `_post/2015-11-12-my-post.md`
the presentation slides/document would be: `downloads/presentations/2015-11-12-my-post.pdf`


To embed a presentation link into the related post use the following:
```
[downloaded here]({{ site.baseurl }}/downloads/presentations/{{ page.path | remove: "_posts/" | replace: '.md', '.pdf' }})
```


##### Specify Environment

currently there are two different environments
  - staging
    - assets are compressed
    - baseurl is our Github Repo  
  - development
    - TODO - assets are not compressed
    - baseurl is an empty string

the default behavior is to set the environment to `development`

to build the site in a different environment use the following parameter: `--env=myEnvironment`  

Example

  ```bash
  grunt build --env=staging
  #or
  grunt build --env=development
  #or
  grunt serve --env=staging
  #or
  grunt serve --env=development
  ```


##### Deploying to Github Pages

Our staging environment is currently utilizing Github Pages. Anyone can deploy
their own instance of our site in the matter of seconds, without additional setup.

If you haven't already go ahead and fork our repository.

execute the following command to automatically compile and deploy the site to Github Pages.
*you will have to type in your github credentials once the script is nearing completion*

Once completed the site can be found at `https://<username>.github.io/open-source-club-website/`

for example if your github username was `foo`, your site could be reached at `https://foo.github.io/open-source-club-website/`

execute the following command to automatically compile and deploy

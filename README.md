# Web components test

This is a simple project to test the render speed of different front end frameworks (libraries) that are able to create
web components.

This project tests 3 libraries (Angular, React, and Vue.js), and the speed if no web components are used.

The libraries were chosen
using [Stackoverflow's developer survey 2023](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-web-frameworks-and-technologies).

## Test methods

The test is the same for each framework. It is to render `5000` simple badge components on a page. The badge component
is a simple `div` with a background and rounded corners.

The test script will open a chromium browser and measure the time taken for each framework to render these `5000`
badges.
This is then repeated 10 times to get an average.

### Running the test

To run the test you will only need docker. This will result in a

```bash
docker compose run --rm web-components-test --build
```

**Note:** The `package-lock.json` file includes libraries resolved for linux x86_64, so if you want to test on a
different architecture then you will need to remove this lock file and change the `Dockerfile` to use `npm i` instead
of `npm ci`.

### Sub projects

### Angular

The angular project was created
using the [angular cli](https://v17.angular.io/guide/setup-local): `npx @angular/cli ng create`. After
which the `@angular/elements` library was added to use an angular component as a web component.
Using the [Angular elements docs](https://v17.angular.io/guide/elements) as a reference.

### React

The react app was made using [create react app](https://create-react-app.dev/docs/getting-started/).
Then the web component was made
using [react's documentation](https://legacy.reactjs.org/docs/web-components.html#using-react-in-your-web-components).

### Vue

The Vue.js app was made using the [quick start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)
from Vue itself. After which
the [documentation](https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue)
for custom elements was used to convert a vue component to a web component.

### Test script

The test script uses express.js to create a local server that hosts the builds for each framework. After this a
headless browser is opened using puppeteer which will then open a page for each framework and tests their speed.

## Results

The tests were run on oracle cloud using `VM.Standard.A1.Flex` with `4` CPU cores and `24 GiB` of ram.
Running `Ubuntu 20.04.6 LTS`.

The table below shows the time it took to render in milliseconds. The size of the compiled js bundle including any
polyfills. The gziped size is the size summed after gzip compressing each file individually. This is done using the
command
`gzip -c 'file' | wc -c` and gzip version `1.13`.

|         | time (ms) | size (KB) | size gzip (KB) |
|---------|-----------|-----------|----------------|
| Native  | 7.80      | N/A       | N/A            |
| Angular | 5425.80   | 140.404   | 46.643         |
| React   | 1435.50   | 141.666   | 45.592         |
| Vue.js  | 401.20    | 55.516    | 22.263         |

You should take the size parameter with a grain of salt because the size includes all the library code which is a one
time cost, so the size per component will decrease as this cost is shared across more components.

<!-- TRACE README -->
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a>
    <img src="https://raw.githubusercontent.com/oslabs-beta/trace-visualization/dev/src/media/trace.png" alt="Logo" height="250">
  </a>
  <h1 align="center"><b>Trace</b></h1>
</p>

  <h2 align="center">
    VS Code extension providing developers with real-time visualization of the data flow of RESTful API applications.
    <br />
    <br />
  </h2>

<!-- BADGES -->
<div align="center">      
    Trace v1.0</a>
    </span></u></b>
</div>

<hr>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#functionality">Functionality</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#articles">Articles</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#meet-our-team">Meet our Team</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<hr>

## <b>Overview</b>

<p align="left">
Trace is a VS Code extension that visualizes the data flow of RESTful API applications, providing the developer with readily accessible information regarding the application's state. By capturing the essential metrics and logs, it creates sequence and database diagrams illustrating the execution of HTTP requests.
</p>
<br/>
<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/trace-visualization/dev/src/media/sequence-diagram.png" width=90% >
  <br/>
  <img  src="https://raw.githubusercontent.com/oslabs-beta/trace-visualization/dev/src/media/database-diagram.png" width=90% >
</p>
<br/>

## <b>Installation / Getting Started</b>

After following installation steps perform the following:

1. Clone the Trace repository onto the user's local machine.
2. Open Trace repo in Visual Studio Code.
3. Run `npm install && cd pern_src/client && npm install && cd ../server && npm install`. This will npm install node modules in the root, client, and server folders.
4. Run `npm run dev` in root directory of extension.
5. Ensure you have 'extension.ts' selected in left menu bar, and click 'Run and Debug'.
   <br/>
   <br/>
   <img  src="https://raw.githubusercontent.com/oslabs-beta/trace-visualization/dev/src/media/installation-step.png" width=90% >
6. Copy and paste `tracing-client.js` into the client src folder where the package.json is located.
7. Copy and paste `tracing-server.js` or `tracing-server.ts` into the server src folder where the package.json is located.
8. When ‘Extension host’ window opens up, open terminal window.
9. Within the server folder of developer's local workspace, run the following command in the terminal

```
npm i -D @opentelemetry/instrumentation@0.41.1 @opentelemetry/exporter-trace-otlp-http@0.41.1 @opentelemetry/instrumentation-http@0.41.1 @opentelemetry/instrumentation-pg@0.36.0 @opentelemetry/sdk-trace-node@1.15.1 @opentelemetry/sdk-trace-base@1.15.1
```

10. Run the application as intended, with the exception of replacing the command that starts the server file to:

```
node --require ./tracing-server.js server_fileName.js
```

or

```
npx ts-node --require ./instrumentation.ts server_fileName.ts
```

11. On your local workspace (.JS, .JSX, .TS, .TSX), run the command ‘Get Telemetry Log File Workspace” by either right-click or in the command palette via 'CMD + Shift + P' for Mac or 'Ctrl + Shift + P' for Windows.
12. Interact and make requests in your browser to generate data in Trace Webview VS Code extension.
    <br/>
    <br/>

## <b>Functionality</b>

- Once the OpenTelemetry dependencies and tracing files have been installed in the local application workspace, the Trace Webview panel can be accessed via the right click menu or command palette within VS Code.
- The 'Sequence Diagram' tab and 'Results' tab will render once the application executes an http request, providing detailed information on each request.  
- Request performance data can be viewed by navigating to the 'Performance' tab. For each unique route, an average response time for every request made during the session is displayed.
- Request History data can be viewed by navigating to the 'History' tab. Each request executed during the session is displayed along with a timestamp.
<br/>
<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/trace-visualization/dev/src/media/main.gif" width=90% >
</p>

- PostgreSQL database data can be viewed by pasting the PGURI in the field located at the top right of the Webview. This can not be done using keyboard shortcuts, use VS Code's edit menu instead. Once the PGURI has been entered, navigate to the 'Database Diagram' tab. For each request containing a SQL query, the fields accessed by the query will be highlighted.
<br/>
<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/trace-visualization/dev/src/media/secondary.gif" width=90% >
</p>

## <b>Tech Stack</b>

- [OpenTelemetry](https://opentelemetry.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://mui.com/material-ui/)
- [React](https://react.dev/)
- [Chart.js](https://github.com/chartjs)
- [JavaScript](https://www.javascript.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Reactflow](https://reactflow.dev/)
- [VSCode Extension API](https://code.visualstudio.com/api)
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [Webpack](https://webpack.js.org/)
  <br/>
  <br/>

## <b>Articles</b>

Check out our <a href="https://medium.com/">medium article</a> for more information on Trace Visualization.

## <b>Contributing</b>

As part of the open source community, we'd like to welcome those who'd like to contribute to this product. We released Trace in hopes of helping developers efficiently onboard new codebases. If you found this project useful, feel free to give it a star to help increase the visibility of this product. If you found any issues with this product, please report them with the 'Issues' tab or submit a PR.

Thank you!

  <p align="left">
      <br />
      <a href="https://github.com/oslabs-beta/trace-visualization/issues">Report Bug / Request Feature</a>
  </p>

## <b>Meet Our Team</b>

- Kevin Featherstone • [LinkedIn](https://www.linkedin.com/in/featherstone-kevin/) • [Github](https://github.com/kevin-featherstone)
- Kevin Yoon • [LinkedIn](https://www.linkedin.com/in/kevinjyoon/) • [Github](https://github.com/kyoon0)
- Ted Chu • [LinkedIn](https://www.linkedin.com/in/tedcchu/) • [Github](https://github.com/tcchu)
- Scott Deutsch • [LinkedIn](https://www.linkedin.com/in/scott-a-deutsch/) • [Github](https://github.com/scottdeutsch40)

## <b>License</b>

<!-- Make sure to add license file to master branch -->

Trace is developed under the [MIT license](https://github.com/oslabs-beta/trace-visualization/blob/dev/LICENSE)

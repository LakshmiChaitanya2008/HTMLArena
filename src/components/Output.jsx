import React, { useEffect, useRef, useContext, useState } from "react";
import { CodeContext } from "../store/CodeContext";
import { Unhook } from "console-feed";

export default function Output() {
  const iframeRef = useRef(null);
  const {
    files,
    currentRightTab,
    autoRun,
    setIframe,
    runCode,
    iframe,
    getAllPackages,
    packages,
  } = useContext(CodeContext);

  useEffect(() => {
    const iF = iframeRef.current;
    setIframe(iF);

    if (autoRun && iframe) {
      const hookedConsole = runCode();

      return () => Unhook(hookedConsole);
    }
  }, [files, autoRun]);

  useEffect(() => {
    if (iframe && !autoRun) {
      getAllPackages();
      const document = iframe.contentWindow.document;
      packages.forEach((pk) => {
        if (pk.latest.endsWith(".js")) {
          const script = document.createElement("script");
          script.src = pk.latest;
          script.dataset.cdnjs = true;
          document.body.appendChild(script);
        }
      });
    }
  }, [iframe, packages]);

  return (
    <div
      className={`border-l-3 border-gray-500 ${
        currentRightTab === 1 ? "hidden" : "block"
      }`}
    >
      <iframe
        ref={iframeRef}
        className="h-screen bg-white w-full"
        id="output-iframe"
        title="output"
        srcDoc={`
        <html>
        <head>
        <style id="styles">
         
         
        </style>
        <script type="module">
          console.log("Welcome to HTMLArena! 💪")
          window.addEventListener('message', (event) => {
            const { type, value } = event.data;

            if (type === 'html') {
              document.body.innerHTML = value;
            }

            if(type === "css"){
              document.querySelector("#styles").innerHTML = value;
            }

            if(type === "javascript"){
              const scriptExists = document.body.querySelector("script")
              if(scriptExists){
                scriptExists.textContext += value;
              } else {
                const scriptEl = document.createElement('script');
                const textNodeEl = document.createTextNode(value);
                scriptEl.type = 'module';
                scriptEl.appendChild(textNodeEl);
                document.body.appendChild(scriptEl)
              }
            }
          }, false)

          
          window.onerror = function(event, source, lineno, colno, error){
            console.error(event, lineno, colno, error)
          }
        </script>
        </head>
        <body>
          
        </body>
      </html>
          `}
      />
    </div>
  );
}

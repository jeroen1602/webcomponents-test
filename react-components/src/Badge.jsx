import React from 'react';
import ReactDOM from "react-dom/client";

export class Badge extends HTMLElement {

    connectedCallback() {
        const mountPoint = document.createElement('span');
        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(mountPoint);

        const style = document.createElement('style');
        style.innerHTML = `.badge {
                    background-color: red;
                    border-radius: 50%;
                    padding: 0.25rem;
                    display: inline;
                    color: white;
                }`;
        shadow.appendChild(style);

        const root = ReactDOM.createRoot(mountPoint);
        root.render(
            <React.StrictMode>
                <div className="badge">
                    <slot></slot>
                </div>
            </React.StrictMode>
        );
    }
}

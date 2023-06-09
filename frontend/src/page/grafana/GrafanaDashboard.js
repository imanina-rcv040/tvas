// import * as React from 'react';
import { useState, useEffect, useRef } from "react";

import Card from '@mui/material/Card';
import { Title } from 'react-admin';

// Every form documentation can reference to here
// https://rjsf-team.github.io/react-jsonschema-form/docs/

const GrafanaDashboard = () => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const iframe = iframeRef.current;
            if (iframe) {
                iframe.style.height = `${window.innerHeight}px`;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getGrafanaPageUrl() {
        return "http://172.17.0.143:13000/d/f16a01ef-8abb-42f5-90bb-cc05fb937a7e/tvas-demo-dashboard?orgId=1&refresh=30s&from=now-30d&to=now"
    }

    const grafanaUrl = getGrafanaPageUrl()

    return (
        <Card>
            <Title title={"Dashboard"} />
            <iframe
                ref={iframeRef}
                src={grafanaUrl}
                title="dashboard"
                style={{ height: '100vh', width: '100%', border: 'none' }}
            ></iframe>

        </Card>
    );
};

export default GrafanaDashboard;

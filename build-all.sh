#!/usr/bin/env bash

cd angular || exit;
npm run build || exit;
cd ../ || exit;

cd react-components || ext;
npm run build || exit;
cd ../ || exit;

cd vue || exit;
npm run build || exit;
cd ../ || exit;

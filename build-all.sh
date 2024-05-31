#!/usr/bin/env bash

cd angular || exit;
npm run build || exit;
cd ../ || exit;

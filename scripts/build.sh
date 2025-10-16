#!/bin/bash
# Script de build para Cloudflare Pages

# Usar npm explicitamente
npm ci
npm run build

# Copiar arquivos de configuração do Cloudflare
cp _headers dist/_headers
cp _redirects dist/_redirects


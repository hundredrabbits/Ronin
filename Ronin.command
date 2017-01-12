#!/bin/bash
cd `dirname "$BASH_SOURCE"`
cd sources
{
  sleep 1
  open http://localhost:8022/ronin.html
}&    
python -m SimpleHTTPServer 8022

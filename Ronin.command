#!/bin/bash
cd `dirname "$BASH_SOURCE"`
{
  sleep 1
  open http://localhost:8022/sources/ronin.html
}&    
python -m SimpleHTTPServer 8022

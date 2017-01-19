#!/bin/bash
cd `dirname "$BASH_SOURCE"`
{
  sleep 1
  open http://localhost:8022/
}&    
python -m SimpleHTTPServer 8022
